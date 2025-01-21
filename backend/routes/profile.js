// routes/profile.js
const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post('/upload-image', authenticateUser, upload.single('image'), uploadImage);

module.exports = router;
