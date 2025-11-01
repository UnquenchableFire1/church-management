const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Member = require('../models/Member');
const { upload } = require('../utils/upload');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT || 587,
  secure: process.env.MAIL_SECURE === 'true',
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});
router.post('/register', async (req, res) => {
  try {
    const { title, firstName, middleName, lastName, email, password, phone, address, dob, age, gender, memberGroup } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    const exists = await Member.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const m = await Member.create({ title, firstName, middleName, lastName, email, passwordHash: hash, phone, address, dob, age, gender, memberGroup });
    res.json({ message: 'Registered', id: m.id });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const m = await Member.findOne({ where: { email } });
    if (!m) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, m.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: m.id, role: 'member', email: m.email }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    const m = await Member.findOne({ where: { email } });
    if (!m) return res.status(200).json({ message: 'If the email exists you will receive a reset link' });
    const token = crypto.randomBytes(24).toString('hex');
    m.resetToken = token; m.resetExpires = new Date(Date.now() + 3600 * 1000);
    await m.save();
    const resetUrl = `${process.env.HOST_URL || 'http://localhost:3000'}/reset-password.html?token=${token}`;
    await transporter.sendMail({ from: process.env.MAIL_USER, to: m.email, subject: 'Password reset', html: '<p>Reset your password <a href="'+resetUrl+'">here</a></p>' });
    res.json({ message: 'If the email exists you will receive a reset link' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Unable to send email' }); }
});
router.post('/reset', async (req, res) => {
  try {
    const { token, password } = req.body;
    const MemberModel = require('../models/Member'); const Sequelize = require('sequelize'); const Op = Sequelize.Op;
    const m = await MemberModel.findOne({ where: { resetToken: token, resetExpires: { [Op.gt]: new Date() } } });
    if (!m) return res.status(400).json({ message: 'Invalid or expired token' });
    m.passwordHash = await bcrypt.hash(password, 10); m.resetToken = null; m.resetExpires = null; await m.save();
    res.json({ message: 'Password reset' });
  } catch (err) { console.error(err); res.status(500).json({ message: err.message }); }
});
module.exports = router;
