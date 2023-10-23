const mongoose = require('mongoose');

const FileStudentSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  documentName: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    enum: ['RESUME', 'COVER', 'TRANSCRIPT', 'OTHERS'],
    require: true,
  },
});

const j4iadmin = mongoose.connection.useDb('j4i-admin');
module.exports = j4iadmin.model('student-documents', FileStudentSchema);
