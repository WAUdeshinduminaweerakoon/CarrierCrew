const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure AWS
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = async (file) => {
  const fileExt = file.originalname.split('.').pop();
  const key = `authorization-letters/${uuidv4()}.${fileExt}`; // unique filename in folder

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    //ACL: 'public-read' // Make the file publicly accessible
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location; // Public URL of uploaded file
};

module.exports = { uploadFile };