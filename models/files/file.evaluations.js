const mongoose = require('mongoose');

const FileEvaluationSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  forID: {
    type: String,
    required: true,
  },
  jobID: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalname:{
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    enum: ['TO STUDENT', 'TO BUSINESS'],
    require: true,
  },
});

const j4iadmin = mongoose.connection.useDb('j4i-admin');
module.exports = j4iadmin.model('evaluation-documents', FileEvaluationSchema);
