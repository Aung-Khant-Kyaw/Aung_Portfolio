/**
 * This file provides the model for the user object
 * @module BusinessUsers[model]
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
 * @property {String} poc - Point of contact of registered business
 * @property {String} email - Email Address
 * @property {String} username - Username
 * @property {String} businessName - Business name of registered business
 * @property {String} businessDivision - Business division of registered business
 * @property {String} businessStreet - Address of the user
 * @property {String} businessStreet2 - Address Line 2 (Optional) of the user
 * @property {String} businessCity - City of the user Address
 * @property {String} businessState - State of the user Address
 * @property {String} businessZip - Zip Code of the user Address
 * @property {String} phoneNumber - Business phone number
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
 */
const BusinessUserSchema = new mongoose.Schema({
  /* Registration process fields */
  userType: {
    type: String,
  },
  poc: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessDivision: {
    type: String,
  },
  businessStreet: {
    type: String,
    required: true,
  },
  businessStreet2: {
    type: String,
  },
  businessCity: {
    type: String,
    required: true,
  },
  businessState: {
    type: String,
    required: true,
  },
  businessZip: {
    type: String,
    required: true,
  },
  userPhoneNumber: {
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
    unique: true,
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

  /* Fields that can be editted after registration */
  companyIndustry: {
    type: String,
  },
  companyType: {
    type: String,
    enum: ['', 'Private', 'Public'],
  },
  companySize: {
    type: String,
  },
  rating: {
    type: String,
  },
  companyOverview: {
    type: String,
  },
  linkCompany: {
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

  /* Automatic fields */
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
  publicComments: [
    {
      name: String,
      rating: Number,
      review: String,
      reviewDate: {
        type: Date,
        default: Date.now,
      },
      commentStatus: {
        type: String,
        enum: ['In-Review', 'Approved', 'Denied'],
        default: 'In-Review',
      },
      businessName: String,
      busiID: mongoose.Types.ObjectId,
    }
  ],
});

/**
 * Mongoose save function for new user. Password recieves secondary enryption via bcrypt hashing.
 * @name save
 * @function
 * @memberof module:businessUsers[model]
 */
BusinessUserSchema.pre('save', function (next) {
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
 * @memberof module:businessUsers[model]
 */
BusinessUserSchema.methods.comparePassword = function (password, done) {
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
BusinessUserSchema.methods.compareTwoPasswords = async function (
  newPassword,
  oldPassword,
  done
) {
  done = await bcrypt.compare(newPassword, oldPassword);
  return done;
};

const j4iadmin = mongoose.connection.useDb('j4i-admin');
module.exports = j4iadmin.model('business-user', BusinessUserSchema);
