const mongoose = require('mongoose');
const CompanyLetter = require('../models/CompanyLetter')

uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const newFile = new CompanyLetter({
      name: file.originalname,
      data: file.buffer,
      contentType: file.mimetype
    });

    const savedFile = await newFile.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      fileId: savedFile._id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload file' });
  }
};

getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid file ID' });
    }
    console.log(!mongoose.Types.ObjectId.isValid(id));

    const file = await CompanyLetter.findById(id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set({
      'Content-Type': file.contentType,
      'Content-Disposition': `inline; filename="${file.name}"`
    });

    console.log("step2")

    res.send(file.data);
  } catch (error) {
    console.error('File retrieval error:', error);
    res.status(500).json({ message: 'Failed to retrieve file' });
  }
};

module.exports = {
  uploadFile,
  getFileById,
};