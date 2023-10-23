/**
 * This file provides the model for the user object
 * @module users[model]
 * @version 0.1
 * @see mongoose
 * @see bcrypt
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Model to represent a user
 * @typedef {mongoose.Schema}
 * @property {String} userType -Type of the user, should be "user" here
 * @property {String} email - Email Address
 * @property {String} username - Username
 * @property {String} address - Address of the user
 * @property {String} addressLine2 - Address Line 2 (Optional) of the user
 * @property {String} city - City of the user Address
 * @property {String} state - State of the user Address
 * @property {String} zipcode - Zip Code of the user Address
 * @property {String} password - User Password (Encrypted)
 * @property {Date} passCreationDate - Date the current password is created on
 * @property {String} oldPasswords - the previous 10 passwords that are no longer used for login
 * @property {String} status: If user confirm email address, then state is Active. Else, pending
 * @property {String} confirmationCode: A unique token for each user.
 * @property {Date} tokenCreationDate - Date the current token is created on
 * @property {String} question1 - First Selected Security Question
 * @property {String} question2 - Second Selected Security Question
 * @property {String} question3 - Third Selected Security Question
 * @property {String} question4 - Fourth Selected Security Question
 * @property {String} question5 - Fifth Selected Security Question
 * @property {String} answer1 - First Security Answer
 * @property {String} answer2 - Second Security Answer
 * @property {String} answer3 - Third Security Answer
 * @property {String} answer4 - Fourth Security Answer
 * @property {String} answer5 - Fifth Security Answer
 * @property {String} poc - Point of contact of registered business
 * @property {String} businessName - Business name of registered business
 * @property {String} division - Business division of registered business
 * @property {String} firstname - First name of registered student
 * @property {String} lastname - Last name of registered student
 * @property {String} phone - Phone Number of the Student
 * @property {String} institution - Institution of registered student
 * @property {String} GPA - GPA of registered student
 * @property {Number} failedLogins - The number of failed login attempts to this account
 */
const UserSchema = new mongoose.Schema({
  userType: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  address: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  password: {
    type: String,
  },
  passCreationDate: {
    type: Date,
  },
  oldPasswords: {
    type: String,
  },
  status: {
    type: String, 
    enum: ['Pending', 'Active'],
  },
  confirmationCode: { 
    type: String, 
    unique: true 
  },
  tokenCreationDate: {
    type: Date,
  },
  question1: {
    type: String,
  },
  question2: {
    type: String,
  },
  question3: {
    type: String,
  },
  answer1: {
    type: String,
  },
  answer2: {
    type: String,
  },
  answer3: {
    type: String,
  },
  // Fields unique to business
  poc: {
    type: String,
  },
  businessName: {
    type: String,
  },
  division: {
    type: String,
  },
  // Fields unique to students
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: String,
  },
  institution: {
    type: String,
  },
  gradyear: {
    type: String,
  },
  GPA: {
    type: String,
  },
  failedLogins: {
    type: Number,
  },
});

/**
 * Mongoose save function for new user. Password recieves secondary enryption via bcrypt hashing.
 * @name save
 * @function
 * @memberof module:users[model]
 */
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

/**
 * Mongoose comparePassword function to check if a entered password is valid by comparing it with its hashed version
 * @name comparePassword
 * @function
 * @memberof module:users[model]
 */
UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

/**
 * Mongoose compare two Passwords function to check if a entered password match with another password
 * @name compareTwoPasswords
 * @function
 * @memberof module:studentUsers[model]
 */
UserSchema.methods.compareTwoPasswords = async function (newPassword, oldPassword, done) {
  done = await bcrypt.compare(newPassword, oldPassword);
  return done;
};

const j4iadmin = mongoose.connection.useDb('j4iadmin');

module.exports = j4iadmin.model('user', UserSchema, 'userTable');
