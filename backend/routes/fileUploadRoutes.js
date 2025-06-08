const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, getFileById } = require('../controllers/fileUploadController');

const storage = multer.memoryStorage(); // Store file in memory as Buffer
const upload = multer({ storage });

router.post('/file', upload.single('file'), uploadFile);
router.get('/view/:id', getFileById);

// backend/routes/fileUploadRoutes.js


const path = require('path');



// Set up multer storage
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload1 = multer({ storage });

// POST route to upload single image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;

