const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, getFileById } = require('../controllers/fileUploadController');

const storage = multer.memoryStorage(); // Store file in memory as Buffer
const upload = multer({ storage });

router.post('/file', upload.single('file'), uploadFile);
router.get('/view/:id', getFileById);

module.exports = router;