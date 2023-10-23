const mongoose = require('mongoose');
const { Schema } = mongoose;

// application schema. Can be used for both student and business
const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  answer: {}, // Mixed type since it can be a string, array, etc.
});
const applicationAnswerSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  applicationTemplateId: {
    type: Schema.Types.ObjectId,
    ref: 'ApplicationTemplate',
    required: true,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Jobs',
    required: true,
  },
  applicationStatus: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    required: true,
  },
  answers: [answerSchema],
});

const j4iAdmin = mongoose.connection.useDb('j4i-admin');

module.exports = j4iAdmin.model('Application-Answer', applicationAnswerSchema);
