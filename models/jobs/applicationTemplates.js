const mongoose = require('mongoose');
const { Schema } = mongoose;
const questionSchema = new Schema({
  type: {
    type: String,
    enum: ['text', 'radio', 'checkbox', 'textarea', 'file', 'email'],
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  options: [String], // Relevant for type 'radio' or 'checkbox'
});

const applicationTemplateSchema = new Schema({
  businessID: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  questions: [questionSchema],
});

const j4iAdmin = mongoose.connection.useDb('j4i-admin');

module.exports = j4iAdmin.model(
  'Application-Template',
  applicationTemplateSchema
);
