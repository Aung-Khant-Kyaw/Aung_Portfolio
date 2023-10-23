/**
 * This file provides the model for the user object
 * @module StudentUsers[model]
 * @version 0.1
 * @see mongoose
 * @see bcrypt
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Job = require('../../models/jobs/jobs');

/**
 * Model to represent a user
 * @typedef {mongoose.Schema}
 * @property {String} userType -Type of the user, should be "user" here
 * @property {String} username - Username
 * @property {String} firstname - Student first name of registered user
 * @property {String} lastname - Student last name of registered user
 * @property {String} email - Email Address
 * @property {String} addressStreet - Address of the user
 * @property {String} addressStreet2 - Address Line 2 (Optional) of the user
 * @property {String} addressCity - City of the user Address
 * @property {String} addressState - State of the user Address
 * @property {String} addressZip - Zip Code of the user Address
 * @property {String} userPhoneNumber - student phone number
 * @property {String} institution - student's institution
 * @property {String} gradYear - student's graduation year
 * @property {String} gpa - student's gpa
 * @property {String} password - User Password (Encrypted)
 * @property {Date} passCreationDate - Date the current password is created on
 * @property {String} oldPasswords - the previous 10 passwords that are no longer used for login
 * @property {String} status: If user confirm email address, then state is Active. Else, pending
 * @property {Boolean} locked: true if the user account is locked. False if the user account is unlocked.
 * @property {Boolean} archived: true if the user account is archived. False if the user account is not archived.
 * @property {String} confirmationCode: A unique token for each user.
 * @property {Date} tokenCreationDate - Date the current token is created on
 * @property {String} securityQuestion1 - First Selected Security Question
 * @property {String} securityQuestion2 - Second Selected Security Question
 * @property {String} securityQuestion3 - Third Selected Security Question
 * @property {String} securityAnswer1 - First Security Answer
 * @property {String} securityAnswer2 - Second Security Answer
 * @property {String} securityAnswer3 - Third Security Answer
 * @property {String} avatar - user's avatar associated with email address
 * @property {Date} date - time the user is created
 * @property {Number} failedLogins - failed attempts to loggins
 */
const StudentUserSchema = new mongoose.Schema({
  userType: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addressStreet: {
    type: String,
    required: true,
  },
  addressStreet2: {
    type: String,
  },
  addressCity: {
    type: String,
    required: true,
  },
  addressState: {
    type: String,
    required: true,
  },
  addressZip: {
    type: String,
    required: true,
  },
  userPhoneNumber: {
    type: String,
  },
  institution: {
    type: String,
    required: true,
  },
  gradYear: {
    type: String,
    required: true,
  },
  gpa: {
    type: String,
  },
  password: {
    type: String,
    required: true,
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
  locked: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  confirmationCode: {
    type: String,
    unique: true
  },
  tokenCreationDate: {
    type: Date,
  },
  securityQuestion1: {
    type: String,
    required: true,
  },
  securityQuestion2: {
    type: String,
    required: true,
  },
  securityQuestion3: {
    type: String,
    required: true,
  },
  securityAnswer1: {
    type: String,
    required: true,
  },
  securityAnswer2: {
    type: String,
    required: true,
  },
  securityAnswer3: {
    type: String,
    required: true,
  },

  /* New fields from /profile-student a.k.a. edit user profile */
  linkPortfolio: {
    type: String,
  },
  linkLinkedIn: {
    type: String,
  },
  linkTwitter: {
    type: String,
  },
  linkOther: {
    type: String,
  },
  bio: {
    type: String,
  },
  /* auto fields */
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  failedLogins: {
    type: Number,
  },
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  jobsHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
});

/**
 * Mongoose save function for new user. Password recieves secondary enryption via bcrypt hashing.
 * @name save
 * @function
 * @memberof module:studentUsers[model]
 */
StudentUserSchema.pre('save', function (next) {
  const user = this;
  /* only hash the password if it has been modified (or is new) */
  if (!user.isModified('password')) return next();

  /* generate a salt then ecrypt the password*/
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * Mongoose comparePassword function to check if a entered password is valid by comparing it with its hashed version
 * @name comparePassword
 * @function
 * @memberof module:studentUsers[model]
 */
StudentUserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  });
};

/**
 * Mongoose compare two Passwords function to check if a entered password match with another password
 * @name compareTwoPasswords
 * @function
 * @memberof module:studentUsers[model]
 */
StudentUserSchema.methods.compareTwoPasswords = async function (newPassword, oldPassword, done) {
  done = await bcrypt.compare(newPassword, oldPassword);
  return done;
};

const j4iadmin = mongoose.connection.useDb('j4i-admin');
module.exports = j4iadmin.model('student-user', StudentUserSchema);
