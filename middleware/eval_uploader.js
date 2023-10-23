const multer = require('multer');
const EvaluationForm = require('../models/files/file.evaluations')

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/profile_pdfs');
  },
  filename: async (req, file, callback) => {
    try {
      const filename = `${Date.now()}-AUNG-${file.originalname}`;
      const fileEval = new EvaluationForm({
        userID: req.body.userId,
        forID: req.body.forId,
        jobID: req.body.jobId,
        filename,
        originalname: file.originalname,
        documentType: req.body.docType,
      });
      await fileEval.save();  
      callback(null, filename);
    } catch (error) {
      callback(new Error(error));
    }
    },
});

const filter = async (req, file, callback) => {
    let query = await EvaluationForm.find({ userID: req.body.userId,
      forID: req.body.forId,
      jobID: req.body.jobId,
      documentType: req.body.docType,});
    if (query.length > 0){
      callback(new Error('User has uploaded an evaluation form already.'));
      callback(null, false);
    } else {
      callback(null, true);
    }
};

const upload = multer({
  fileFilter: filter,
  storage: fileStorage,
});

module.exports = upload;
