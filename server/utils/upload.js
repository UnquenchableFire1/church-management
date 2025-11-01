const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const profilesDir = path.join(__dirname, '..', 'uploads', 'profiles');
if (!fs.existsSync(profilesDir)) fs.mkdirSync(profilesDir, { recursive: true });
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, profilesDir); },
  filename: function (req, file, cb) { const ext = path.extname(file.originalname); cb(null, `${Date.now()}-${uuidv4()}${ext}`); }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });
module.exports = { upload, profilesDir };
