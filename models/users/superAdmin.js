/**
 * This file provides the model for the super admin object
 * @module superAdmin[model]
 * @version 0.1
 * @see mongoose
 * @see bcrypt
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Model to represent a super admin
 * @property {String} userType -Type of the user, should be "superAdmin" here
 * @property {String} username - Username
 * @property {String} password - User Password (Encrypted)
 * @property {Number} failedLogins - failed attempts to loggins
 */
const SuperAdminSchema = new mongoose.Schema({
    userType: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    failedLogins: {
        type: Number,
    },
});

/**
 * Mongoose save function for new user. Password recieves secondary enryption via bcrypt hashing.
 * @name save
 * @function
 * @memberof module:adminUsers[model]
 */
SuperAdminSchema.pre('save', function (next) {
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
SuperAdminSchema.methods.comparePassword = function (password, done) {
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
SuperAdminSchema.methods.compareTwoPasswords = async function (newPassword, oldPassword, done) {
    done = await bcrypt.compare(newPassword, oldPassword);
    return done;
};

const j4iadmin = mongoose.connection.useDb('j4i-admin');
module.exports = j4iadmin.model('super-admin', SuperAdminSchema);