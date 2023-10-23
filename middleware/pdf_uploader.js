const multer = require('multer');
const StudentUser = require('../models/users/studentUser');
const BusinessUser = require('../models/users/businessUser');
const FileBusinessModel = require('../models/files/file.business');
const FileStudentModel = require('../models/files/file.student');

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/profile_pdfs');
  },
  filename: async (req, file, callback) => {
    try {
      const filename = `${Date.now()}-AUNG-${file.originalname}`;
      const pdfObj = JSON.parse(req.body.pdfObject);

      if (req.body.userType === 'student') {
        const fileStudentData = new FileStudentModel({
          userID: req.body.userId,
          filename,
          originalname: file.originalname,
          documentName: pdfObj.docName,
          documentType: pdfObj.docType,
        });
        await fileStudentData.save();
      } else if (req.body.userType === 'business') {
        const fileBusinessData = new FileBusinessModel({
          userID: req.body.userId,
          filename,
          originalname: file.originalname,
          documentName: pdfObj.docName,
          documentType: pdfObj.docType,
        });
        await fileBusinessData.save();
      }

      callback(null, filename);
    } catch (error) {
      callback(new Error(error));
    }
  },
});

const filter = async (req, file, callback) => {
  try {
    let user =
      (await StudentUser.findById(req.body.userId)) ||
      (await BusinessUser.findById(req.body.userId));
    if (user === null) {
      callback(new Error('User Not Found'));
    }

    if (file.mimetype === 'application/pdf') {
      callback(null, true);
    } else {
      callback(new Error('Only accept pdf files'));
    }
  } catch (error) {
    callback(new Error('User Not Found'));
  }
};

const upload = multer({
  storage: fileStorage,
  fileFilter: filter,
});

module.exports = upload;
