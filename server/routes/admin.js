const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { Member, Ministry, Sermon, Event, Announcement } = require('../models/index');
const { upload } = require('../utils/upload');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
// admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ role: 'admin', username }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid admin credentials' });
});
function requireAdmin(req, res, next){ const token = req.headers.authorization?.split(' ')[1]; if(!token) return res.status(401).json({ message: 'Unauthorized' }); try{ const p = jwt.verify(token, JWT_SECRET); if(p.role!=='admin') return res.status(403).json({ message: 'Forbidden' }); next(); }catch(e){ res.status(401).json({ message: 'Invalid token' }); } }
// members listing with pagination & search
router.get('/members', requireAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page||'1')); const limit = Math.max(1, parseInt(req.query.limit||'10')); const offset = (page-1)*limit;
  const search = (req.query.search||'').trim(); const where = {};
  if (search) where[Op.or] = [{ firstName: { [Op.like]: `%${search}%` } }, { lastName: { [Op.like]: `%${search}%` } }, { email: { [Op.like]: `%${search}%` } }];
  const { count, rows } = await Member.findAndCountAll({ where, limit, offset, attributes: { exclude: ['passwordHash','resetToken','resetExpires'] }, order:[['createdAt','DESC']] });
  res.json({ total: count, page, limit, members: rows });
});
router.post('/members', requireAdmin, async (req, res) => {
  const { title, firstName, middleName, lastName, email, password, phone, address, dob, gender, memberGroup } = req.body;
  const bcrypt = require('bcryptjs'); const hash = await bcrypt.hash(password || 'changeme', 10);
  const age = dob ? Math.floor((Date.now() - new Date(dob)) / (365.25*24*60*60*1000)) : null;
  const m = await Member.create({ title, firstName, middleName, lastName, email, passwordHash: hash, phone, address, dob, age, gender, memberGroup });
  res.json(m);
});
router.put('/members/:id', requireAdmin, async (req, res) => {
  const id = req.params.id; const allowed = ['title','firstName','middleName','lastName','email','phone','address','dob','age','gender','memberGroup','ministryId']; const payload = {}; for (const k of allowed) if (req.body[k] !== undefined) payload[k] = req.body[k]; await Member.update(payload, { where: { id } }); const updated = await Member.findByPk(id, { attributes: { exclude: ['passwordHash'] } }); res.json(updated);
});
router.delete('/members/:id', requireAdmin, async (req, res) => { await Member.destroy({ where: { id: req.params.id } }); res.json({ message: 'Deleted' }); });
router.post('/members/:id/profile', requireAdmin, upload.single('profile'), async (req, res) => {
  try { const m = await Member.findByPk(req.params.id); if (!m) return res.status(404).json({ message: 'Member not found' }); if (!req.file) return res.status(400).json({ message: 'File required' }); m.profilePic = `/uploads/profiles/${req.file.filename}`; await m.save(); res.json({ message: 'Uploaded', profilePic: m.profilePic }); } catch (err) { res.status(500).json({ message: err.message }); }
});
// ministries
router.post('/ministries', requireAdmin, async (req, res) => { const m = await Ministry.create(req.body); res.json(m); });
router.get('/ministries', requireAdmin, async (req, res) => res.json(await Ministry.findAll()));
router.delete('/ministries/:id', requireAdmin, async (req, res) => { const id = req.params.id; await Ministry.destroy({ where: { id } }); res.json({ message: 'Deleted' }); });
// sermons upload
const sermonStorage = multer.diskStorage({
  destination: function(req,file,cb){ const dir = path.join(__dirname,'..','uploads','sermons'); if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true}); cb(null,dir); },
  filename: function(req,file,cb){ cb(null, Date.now()+'-'+file.originalname.replace(/\s+/g,'-')); }
});
const sermonUpload = multer({ storage: sermonStorage });
router.post('/sermons', requireAdmin, sermonUpload.single('file'), async (req, res) => { if(!req.file) return res.status(400).json({ message: 'File required' }); const s = await Sermon.create({ title: req.body.title || req.file.originalname, filename: req.file.filename, originalName: req.file.originalname, mimeType: req.file.mimetype }); res.json(s); });
router.get('/sermons', requireAdmin, async (req, res) => res.json(await Sermon.findAll()));
router.delete('/sermons/:id', requireAdmin, async (req, res) => { const s = await Sermon.findByPk(req.params.id); if(!s) return res.status(404).json({ message: 'Not found' }); const filepath = path.join(__dirname,'..','uploads','sermons', s.filename); if(fs.existsSync(filepath)) fs.unlinkSync(filepath); await s.destroy(); res.json({ message: 'Deleted' }); });
// events & announcements
router.post('/events', requireAdmin, async (req, res) => { const e = await Event.create(req.body); res.json(e); });
router.get('/events', requireAdmin, async (req, res) => res.json(await Event.findAll()));
router.delete('/events/:id', requireAdmin, async (req, res) => { await Event.destroy({ where: { id: req.params.id } }); res.json({ message: 'Deleted' }); });
router.post('/announcements', requireAdmin, async (req, res) => { const a = await Announcement.create(req.body); res.json(a); });
router.get('/announcements', requireAdmin, async (req, res) => res.json(await Announcement.findAll()));
router.delete('/announcements/:id', requireAdmin, async (req, res) => { const id = req.params.id; await Announcement.destroy({ where: { id } }); res.json({ message: 'Deleted' }); });
module.exports = router;
