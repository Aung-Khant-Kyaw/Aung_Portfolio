const multer = require('multer');
const StudentUser = require('../models/users/studentUser');
const BusinessUser = require('../models/users/businessUser');

const imgStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/profile_images');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-AUNG-${file.originalname}`);
  },
});

const isImage = async (req, file, callback) => {
  try {
    if (file.mimetype.startsWith('image')) {
      callback(null, true);
    } else {
      callback(new Error('Only accept image files'));
    }
  } catch (error) {
    callback(new Error('User Not Found'));
  }
};

const upload = multer({
  storage: imgStorage,
  fileFilter: isImage,
});

module.exports = upload;
