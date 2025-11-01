const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');
const Sermon = require('../models/Sermon');
const Ministry = require('../models/Ministry');
const Member = require('../models/Member');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
router.get('/events', async (req, res) => res.json(await Event.findAll({ order: [['date','ASC']] })));
router.get('/announcements', async (req, res) => res.json(await Announcement.findAll({ order: [['createdAt','DESC']] })));
router.get('/ministries', async (req, res) => res.json(await Ministry.findAll()));
router.get('/sermons', async (req, res) => res.json(await Sermon.findAll({ order: [['uploadedAt','DESC']] })));
router.get('/members', async (req, res) => res.json(await Member.findAll({ attributes: { exclude: ['passwordHash','resetToken','resetExpires'] } })));
router.get('/sermons/download/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const p = jwt.verify(token, JWT_SECRET);
    if (!['member','admin'].includes(p.role)) return res.status(403).json({ message: 'Forbidden' });
    const s = await Sermon.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    const file = path.join(__dirname, '..', 'uploads', 'sermons', s.filename);
    return res.download(file, s.originalName);
  } catch (err) { return res.status(401).json({ message: 'Invalid token' }); }
});
module.exports = router;
