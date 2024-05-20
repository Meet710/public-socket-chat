const multer = require("multer");
const path = require('path')
const crypto = require('crypto');
const EventEmitter = require('events')

// Create an event emitter to pass the filename
const fileEmitter = new EventEmitter();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
      const unique_filename = generateUniqueFileName(file.originalname);
      fileEmitter.emit('fileUploaded', unique_filename);
      cb(null, unique_filename);
    }
});

const upload = multer({ storage: storage });

function generateUniqueFileName(originalName) {
  const randomString = crypto.randomBytes(16).toString('hex');
  const ext = path.extname(originalName);
  const uniqueFileName = `${randomString}${ext}`;
  return uniqueFileName;
}

module.exports = { upload ,fileEmitter};
