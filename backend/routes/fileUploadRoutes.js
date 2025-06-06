const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../utils/s3Upload');

const router = express.Router();
const upload = multer(); // Memory storage

router.post('/s3', upload.single('file'), async (req, res) => {
  try {
    const fileUrl = await uploadFile(req.file);
    res.json({ fileUrl });
  } catch (err) {
    console.error("S3 Upload Error:", err);
    res.status(500).json({ message: "Upload to S3 failed" });
  }
});

module.exports = router;

