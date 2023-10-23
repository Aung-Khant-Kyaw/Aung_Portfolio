/**
 * This file provides the model for the admin object
 * @module admins[model]
 * @version 0.1
 * @see mongoose
 * @see bcrypt
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Model to represent a admin
 * @property {String} userType -Type of the user, should be "admin" here
 * @property {String} username - Username
 * @property {String} firstname - Student first name of registered user
 * @property {String} lastname - Student last name of registered user
 * @property {String} email - Email Address
 * @property {String} password - User Password (Encrypted)
 * ---------- Values for security ------------
 * @property {String} status: If user confirm email address, then state is Active. Else, pending
 * @property {String} confirmationCode: A unique token for each user.
 * @property {Number} failedLogins - failed attempts to loggins
 * ---------- SecurityQuestions and Answers -----------
 * @property {String} securityQuestion1 - First Selected Security Question
 * @property {String} securityQuestion2 - Second Selected Security Question
 * @property {String} securityQuestion3 - Third Selected Security Question
 * @property {String} securityAnswer1 - First Security Answer
 * @property {String} securityAnswer2 - Second Security Answer
 * @property {String} securityAnswer3 - Third Security Answer
 */
const AdminUserSchema = new mongoose.Schema({
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
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
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
    failedLogins: {
        type: Number,
    },
    securityQuestion1: {
        type: String,
    },
    securityQuestion2: {
        type: String,
    },
    securityQuestion3: {
        type: String,
    },
    securityAnswer1: {
        type: String,
    },
    securityAnswer2: {
        type: String,
    },
    securityAnswer3: {
        type: String,
    },
});

/**
 * Mongoose save function for new user. Password recieves secondary enryption via bcrypt hashing.
 * @name save
 * @function
 * @memberof module:adminUsers[model]
 */
AdminUserSchema.pre('save', function (next) {
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
 * @memberof module:adminUsers[model]
 */
AdminUserSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return done(err);
        done(null, isMatch);
    });
};

/**
   * Mongoose compare two Passwords function to check if a entered password match with another password
   * @name compareTwoPasswords
   * @function
   * @memberof module:adminUsers[model]
   */
AdminUserSchema.methods.compareTwoPasswords = async function (newPassword, oldPassword, done) {
    done = await bcrypt.compare(newPassword, oldPassword);
    return done;
};

const j4iadmin = mongoose.connection.useDb('j4i-admin');
module.exports = j4iadmin.model('admin-user', AdminUserSchema);