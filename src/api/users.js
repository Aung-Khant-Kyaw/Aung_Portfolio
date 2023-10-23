/**
 * This module provides routes to query and get data from the database related to user objects
 * @module users[api]
 * @version 0.1
 * @see express
 * @see StudentUser[model]
 * @see BusinessUser[model]
 * @see express-validator
 * @see gravatar
 */
const express = require('express');
const router = express.Router();
const StudentUser = require('../../models/users/studentUser');
const BusinessUser = require('../../models/users/businessUser');
const AdminUser = require('../../models/users/admins');
const SuperAdmin = require('../../models/users/superAdmin');
const FileBusinessModel = require('../../models/files/file.business');
const FileStudentModel = require('../../models/files/file.student');
const EvaluationForm = require('../../models/files/file.evaluations');
const Job = require('../../models/jobs/jobs');
const { check, validationResult } = require('express-validator');
const img_uploader = require('../../middleware/img_uploader');
const pdf_uploader = require('../../middleware/pdf_uploader');
const eval_uploader = require('../../middleware/eval_uploader');
const fs = require('fs');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const PROFILE_IMAGE_PATH = `${appDir}/public/profile_images`;
const FILE_PATH = `${appDir}/public/profile_pdfs`;
const jwt = require('jwt-encode');
// required for sending confirmation link to user
const nodemailer = require('nodemailer');
const senderGmail = process.env.SENDER_EMAIL;
const senderPass = process.env.SENDER_PASS;
const address = process.env.REACT_APP_CLIENT;

/** ----------- APIs -----------
 * get /:id - get users by id
 * post / - post register user
 * post /login - login authentication of users (student, business, admin, superadmin)
 * post /resetpassword - reset password by student and business
 * post /check-user - check if a selected username is already taken
 * post /check-email - check if a selected email is already taken
 * post /check-email-profile - check if a selected email is already taken for updating profile
 * put /update-user - updating user with JSON passed in HTTP body
 * patch /upload-avatar - updates user avatar
 * get /avatar/:profilePicture - get avatar address
 * post /upload-pdf - upload pdf using pdf_uploader
 * get /file/:userID - get all files uploaded by user
 * get /securityquestions - get the securityquestions used by the user
 * delete /deletestdfile - delete student file by id
 * delete /deletebnfile - delete business file by id
 * put /confirm/:confirmationCode - verify user with the code after the email
 * get /busicard/:businessID - get business name and avatar address for business card
 * post /postcomment/:businessID - add a public comment for the business
 */

// @route GET api/users/:id
// Get user by ID
/**
 * Route serving retrieval of user by id
 * @name get/:id
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.get('/:id', async (req, res) => {
  try {
    const user =
      (await BusinessUser.findById(req.params.id).select('-password')) ||
      (await StudentUser.findById(req.params.id).select('-password')) ||
      (await AdminUser.findById(req.params.id).select('-password')) ||
      (await SuperAdmin.findById(req.params.id).select('-password'));
    if (!user) res.status(404).json({ msg: 'User Not Found' });

    return res.status(200).json(user);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).send('Server error: ' + err.message);
  }
});

// @route POST api/users
// Post users
/**
 * Route serving registering a user
 * @name post/
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.post(
  '/',
  [
    img_uploader.single('photo'),
    check('email', 'Please input a valid email').isEmail(),
    check(
      'username',
      'Please input a valid username with 5 or more characters'
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    /* middleware checks */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      /* Find user in User module using http body */
      const userNameFilter = { username: req.body.username };
      const emailFilter = { email: req.body.email };
      let studentUser = await StudentUser.findOne(userNameFilter);
      let studentEmail = await StudentUser.findOne(emailFilter);
      let businessUser = await BusinessUser.findOne(userNameFilter);
      let businessEmail = await BusinessUser.findOne(emailFilter);
      let adminUser = await AdminUser.findOne(userNameFilter);
      let adminEmail = await AdminUser.findOne(emailFilter);
      let superAdmin = await SuperAdmin.findOne(userNameFilter);
      let superAdminEmail = await SuperAdmin.findOne(emailFilter);

      /* Return HTTP.CONFLICT if a user already exists (registered) */
      if (
        (JSON.stringify(studentUser?._id) !== JSON.stringify(req.body._id) &&
          studentUser !== null) ||
        (JSON.stringify(studentEmail?._id) !== JSON.stringify(req.body._id) &&
          studentEmail !== null) ||
        (JSON.stringify(businessUser?._id) !== JSON.stringify(req.body._id) &&
          businessUser !== null) ||
        (JSON.stringify(businessEmail?._id) !== JSON.stringify(req.body._id) &&
          businessEmail !== null) ||
        (JSON.stringify(adminUser?._id) !== JSON.stringify(req.body._id) &&
          adminUser !== null) ||
        (JSON.stringify(adminEmail?._id) !== JSON.stringify(req.body._id) &&
          adminEmail !== null) ||
        (JSON.stringify(superAdmin?._id) !== JSON.stringify(req.body._id) &&
          superAdmin !== null) ||
        (JSON.stringify(superAdminEmail?._id) !==
          JSON.stringify(req.body._id) &&
          superAdminEmail !== null)
      ) {
        return res
          .status(409)
          .json({ msg: 'User already exists with this email or username' });
      }

      /* make an unique token for each user with email*/
      const token = jwt({ emailFilter }, new Date().toString());

      /* make an unique token for each user with email*/
      var date = new Date();

      /* Set up new user */
      if (req.body.userType === 'student') {
        user = new StudentUser({
          ...req.body,
          passCreationDate: date,
          oldPasswords: '',
          status: 'Pending',
          confirmationCode: token,
          failedLogins: 0,
        });
      } else if (req.body.userType === 'business') {
        user = new BusinessUser({
          ...req.body,
          passCreationDate: date,
          oldPasswords: '',
          status: 'Pending',
          confirmationCode: token,
          failedLogins: 0,
        });
      }

      if (req.file) {
        const { filename } = req.file;
        user.avatar = filename;
      } else {
        user.avatar = 'avatar';
      }

      // prepare to send an email to user
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'login',
          user: senderGmail,
          pass: senderPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // create email message with the link
      var emailHTML =
        '<h1>Welcome to J4I, NAME!</h1> <h2>Please confirm your email by clicking on the following link:</h2> <a href=HOST/confirmation-code?code=CODE> Click here</a>';
      emailHTML = emailHTML.replace('NAME', userNameFilter.username);
      emailHTML = emailHTML.replace('CODE', token);
      emailHTML = emailHTML.replace('HOST', address);

      // send the message
      transporter.sendMail({
        from: senderGmail,
        to: emailFilter.email,
        subject: 'Please confirm your account for J4I',
        html: emailHTML,
      });

      /* Write user to J4I-admin database */
      await user.save();
      res.status(200).json({ msg: 'User successfully created' });
    } catch (err) {
      console.error(`Error: ${err.message}`);
      res.status(500).send('Server error: ' + err.message);
    }
  }
);

// @route POST api/login
// Authenticate user
/**
 * Route serving login authentication of users
 * @name post/login
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.post(
  '/login',
  [
    check('username', 'Please include a valid username').isLength({ min: 5 }),
    check('password', 'Password is required').notEmpty(),
  ],
  async (req, res, next) => {
    /* middleware checks */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      /* Find user in User module using http body */
      let user =
        (await StudentUser.findOne({ username: req.body.username })) ||
        (await BusinessUser.findOne({ username: req.body.username })) ||
        (await AdminUser.findOne({ username: req.body.username })) ||
        (await SuperAdmin.findOne({ username: req.body.username }));

      /* If user = null, return HTTP.NOT_FOUND */
      if (!user) {
        let data = {};
        data.role = 'Error';
        data.error = 'User not found';
        return res.status(404).json(data);
      }

      /* Reset failedLogins field after 3 minutes */
      setTimeout(async () => {
        user.failedLogins = 0;
        await user.save();
      }, 180000);

      /* If user failed to login more than 5 times, return HTTP.BAD_REQUEST*/
      if (user.failedLogins > 5) {
        let data = {};
        data.role = 'Error';
        data.error =
          'Too many failed login attempts. \n Please try again in 3 minutes';
        return res.status(401).json(data);
      }

      /* Test matching password */
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;

        let data = {};

        if (isMatch) {
          if (user.userType === 'superAdmin') {
            // Successful login
            data.role = 'Success';
            data.username = user.username;
            data.userType = user.userType;
            data.email = user.email;
            data.ID = user._id;
            user.failedLogins = 0;
            user.save();
            return res.status(200).json(data);
          } else if (user.userType === 'admin') {
            // Successful login
            data.role = 'Success';
            data.username = user.username;
            data.userType = user.userType;
            data.email = user.email;
            data.ID = user._id;
            user.failedLogins = 0;
            user.save();
            return res.status(200).json(data);
          } else {
            // if the userType is Business OR student

            // If the user account is archived or locked
            if (user.archived || user.locked) {
              let data = {};
              data.role = 'Error';
              data.error =
                'Your account is inactive. Please contact the Admin!';
              return res.status(404).json(data);
            }

            // Successful login
            data.role = 'Success';
            data.username = user.username;
            data.userType = user.userType;
            data.email = user.email;
            data.ID = user._id;
            user.failedLogins = 0;
            if (user.status !== 'Active') {
              data.role = 'Error';
              data.error = 'Pending Account. Please Verify Your Email!';
              user.failedLogins = user.failedLogins + 1;
              user.save();
              return res.status(401).json(data);
            }
            // if the day difference bet today & passCreationDate is more than 90 days, redirect to password reset page
            const today = new Date();
            const passCreationDate = new Date(user.passCreationDate);
            var diffTime = today.getTime() - passCreationDate.getTime();
            var diffDay = diffTime / (1000 * 3600 * 24);
            if (diffDay >= 90) {
              /* make an unique token for the reset password email*/
              var emaill = user.email;
              var currentTime = new Date();
              user.tokenCreationDate = currentTime;
              const token = jwt({ emaill }, currentTime.toString());
              user.confirmationCode = token;
              user.save();
              data.role = 'Error';
              data.error = 'Your password has expired!';
              data.token = user.confirmationCode;
              return res.status(401).json(data);
            }
            // if the day difference bet today & passCreationDate is more than 10 days, notify user
            if (diffDay >= 80) {
              data.role = 'Expiration';
              var message = 'Your password will expire in TIME days!';
              const expiration = 90 - Math.floor(diffDay);
              message = message.replace('TIME', expiration);
              data.expiration = message;
              user.save();
              return res.status(200).json(data);
            }
            user.save();
            return res.status(200).json(data);
          }
        } else {
          // failed login
          data.role = 'Error';
          data.error = 'Invalid Credentials';
          user.failedLogins = user.failedLogins + 1;
          user.save();
          return res.status(401).json(data);
        }
      });
    } catch (err) {
      console.error(`Error: ${err.message}`);
      res.status(500).send('Server error: ' + err.message);
    }
  }
);

// @route POST api/resetpassword
// reset password: requirement must get the security questions, then new password must not match any of the previous 10 passwords
/**
 * Route serving to reset password
 * @name post/resetpassword
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.post('/resetpassword', async (req, res) => {
  try {
    /* Find user in User module using http body */
    let user =
      (await StudentUser.findOne({ username: req.body.username })) ||
      (await BusinessUser.findOne({ username: req.body.username }));

    /* If user = null, return HTTP.NOT_FOUND */
    if (!user) {
      let data = {};
      data.role = 'Error';
      data.error = 'User not found';
      return res.status(404).json(data);
    }

    // If the user account is archived or locked
    if (user.archived || user.locked) {
      let data = {};
      data.role = 'Error';
      data.error = 'Your account is inactive. Please contact the Admin!';
      return res.status(404).json(data);
    }

    /* Reset failedLogins field after 3 minutes */
    setTimeout(async () => {
      user.failedLogins = 0;
      await user.save();
    }, 180000);

    /* If user failed to login more than 5 times, return HTTP.BAD_REQUEST*/
    if (user.failedLogins > 5) {
      let data = {};
      data.role = 'Error';
      data.error =
        'Too many failed login attempts. \n Please try again in 3 minutes';
      return res.status(401).json(data);
    }

    /* Check security questions */
    if (
      req.body.securityAnswer1.toLowerCase() ===
        user.securityAnswer1.toLowerCase() &&
      req.body.securityAnswer2.toLowerCase() ===
        user.securityAnswer2.toLowerCase() &&
      req.body.securityAnswer3.toLowerCase() ===
        user.securityAnswer3.toLowerCase()
    ) {
      // see if the new password match any of the old passwords
      const oldPassword = user.oldPasswords.split(' ');
      var isMatch = false;
      var done = true;
      isMatch = await user.compareTwoPasswords(
        req.body.password,
        user.password,
        done
      );
      if (!isMatch) {
        for (let i = 0; i < oldPassword.length; i++) {
          isMatch = await user.compareTwoPasswords(
            req.body.password,
            oldPassword[i],
            done
          );
          if (isMatch) {
            break;
          }
        }
      }

      if (!isMatch) {
        // successful password
        // add last password to old passwords
        let oldPasswords = user.oldPasswords.split(' ');
        let newOldPasswords = '';
        if (oldPasswords.length >= 10) {
          newOldPasswords = user.password;
          for (let i = 0; i < 8; i++) {
            newOldPasswords = newOldPasswords + ' ' + oldPasswords[i];
          }
          user.oldPasswords = newOldPasswords;
        } else {
          user.oldPasswords = user.password + ' ' + user.oldPasswords;
        }
        //update current password
        user.password = req.body.password;
        // change passCreation date
        user.passCreationDate = new Date();
        // change status to 'pending'
        user.status = 'Pending';
        // send confirmation email
        // prepare to send an email to user
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            type: 'login',
            user: senderGmail,
            pass: senderPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // create new token to confirmation
        var currentTime = new Date();
        user.tokenCreationDate = currentTime;
        var email = user.email;
        const token = jwt({ email }, currentTime.toString());
        user.confirmationCode = token;
        // create email message with the link
        var emailHTML =
          '<h1>Welcome to J4I, NAME!</h1> <h2>Please confirm your email by clicking on the following link:</h2> <a href=HOST/confirmation-code?code=CODE> Click here</a>';
        emailHTML = emailHTML.replace('NAME', user.username);
        emailHTML = emailHTML.replace('CODE', token);
        emailHTML = emailHTML.replace('HOST', address);
        // send the message
        transporter.sendMail({
          from: senderGmail,
          to: email,
          subject: 'Please confirm your account for J4I',
          html: emailHTML,
        });
        /* update user to J4I-admin database */
        await user.save();
        res.status(200).json({ msg: 'User successfully created' });
      } else {
        // failed login
        let data = {};
        data.role = 'Error';
        data.error =
          'Your password match one of last 10 passwords. Please try again!';
        user.failedLogins = user.failedLogins + 1;
        await user.save();
        return res.json(data);
      }
    } else {
      user.failedLogins = user.failedLogins + 1;
      await user.save();
      let data = {};
      data.role = 'Error';
      data.error = 'Wrong answer(s) for security questions. Try again!';
      return res.json(data);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).send('Server error: ' + err.message);
  }
});

/**
 * Route serving a check to see if a selected username  have already been taken
 * @name post/check-username
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.post('/check-username', async (req, res) => {
  try {
    let user =
      (await StudentUser.findOne({
        $or: [{ username: req.body.username }],
      })) ||
      (await BusinessUser.findOne({
        $or: [{ username: req.body.username }],
      })) ||
      (await AdminUser.findOne({
        $or: [{ username: req.body.username }],
      })) ||
      (await SuperAdmin.findOne({
        $or: [{ username: req.body.username }],
      }));
    if (user) {
      return res.json({ errors: 'User already exists' });
    }

    return res.status(200).json({ msg: 'valid username' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).send('Server error: ' + err.message);
  }
});

/**
 * Route serving a check to see if a selected email has already been taken for registering
 * @name post/checkemail
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.post('/check-email', async (req, res) => {
  try {
    let user =
      (await StudentUser.findOne({
        $or: [{ email: req.body.email }],
      })) ||
      (await BusinessUser.findOne({
        $or: [{ email: req.body.email }],
      })) ||
      (await AdminUser.findOne({
        $or: [{ email: req.body.email }],
      }));
    if (user) {
      return res.json({ errors: 'User already exists' });
    }

    return res.status(200).json({ msg: 'valid email' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).send('Server error: ' + err.message);
  }
});

/**
 * Route serving a check to see if a selected email has already been taken for updating profile
 * @name post/checkemail
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.post('/check-email-profile', async (req, res) => {
  try {
    const emailFilter = { email: req.body.email };

    let studentUser = await StudentUser.findOne(emailFilter);
    let businessUser = await BusinessUser.findOne(emailFilter);
    let adminUser = await AdminUser.findOne(emailFilter);

    if (
      (studentUser !== null &&
        JSON.stringify(studentUser?._id) !== JSON.stringify(req.body._id)) ||
      (businessUser !== null &&
        JSON.stringify(businessUser?._id) !== JSON.stringify(req.body._id)) ||
      (adminUser !== null &&
        JSON.stringify(adminUser?._id) !== JSON.stringify(req.body._id))
    ) {
      return res.json({ errors: 'User already exists' });
    }

    return res.status(200).json({ msg: 'valid email' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).send('Server error: ' + err.message);
  }
});

/**
 * Route updating user with JSON passed in from HTTP body
 * @name put/update-user
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.put('/update-user', async (req, res) => {
  try {
    const { userID, ...updatedUser } = req.body;
    const userNameFilter = { username: req.body.username };
    const emailFilter = { email: req.body.email };

    let studentUser = await StudentUser.findOne(userNameFilter);
    let studentEmail = await StudentUser.findOne(emailFilter);
    let businessUser = await BusinessUser.findOne(userNameFilter);
    let businessEmail = await BusinessUser.findOne(emailFilter);

    /* Return HTTP.CONFLICT if a user already exists (registered) */
    if (
      (JSON.stringify(studentUser?._id) !== JSON.stringify(req.body._id) &&
        studentUser !== null) ||
      (JSON.stringify(studentEmail?._id) !== JSON.stringify(req.body._id) &&
        studentEmail !== null) ||
      (JSON.stringify(businessUser?._id) !== JSON.stringify(req.body._id) &&
        businessUser !== null) ||
      (JSON.stringify(businessEmail?._id) !== JSON.stringify(req.body._id) &&
        businessEmail !== null)
    ) {
      return res
        .status(409)
        .json({ msg: 'User already exists with this email or username' });
    }
    /* make an unique token for each user with email*/
    const token = jwt({ emailFilter }, new Date().toString());
    updatedUser['confirmationCode'] = token;
    if (req.body.userType === 'student') {
      await StudentUser.findOneAndUpdate(
        {
          _id: req.body._id,
        },
        updatedUser
      );
    } else {
      await BusinessUser.findOneAndUpdate(
        {
          _id: req.body._id,
        },
        updatedUser
      );
    }

    res.json('Successful update user');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * Route updates user avatar
 * @name patch/upload-avatar
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.patch(
  '/upload-avatar',
  img_uploader.single('photo'),
  async (req, res) => {
    try {
      const userID = req.body.userID;
      const { filename } = req.file;
      let user =
        (await StudentUser.findOne({ _id: userID })) ||
        (await BusinessUser.findOne({ _id: userID }));
      if (user == null) {
        res.json({ error: 'No User found' });
      }

      const xProfileImagePath = user.avatar;

      if (fs.existsSync(`${PROFILE_IMAGE_PATH}/${xProfileImagePath}`)) {
        fs.unlink(`${PROFILE_IMAGE_PATH}/${xProfileImagePath}`, (err) => {
          if (err) throw err;
        });
      }

      user.avatar = filename;
      await user.save();

      res.json('Image successfully uploaded');
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

/**
 * Route get avatar
 * @name get/avatar/:profilePicture
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.get('/avatar/:profilePicture', async (req, res) => {
  const profilePicture = req.params.profilePicture;
  if (fs.existsSync(`${PROFILE_IMAGE_PATH}/${profilePicture}`)) {
    res.json(`profile_images/${profilePicture}`);
  } else {
    res.json({ error: 'file not found' });
  }
});

router.post('/upload-pdf', pdf_uploader.array('pdf', 5), async (req, res) => {
  // All the logic get resolved in the pdf_uploader middleware
  res.json({ msg: 'File successfully uploaded' });
});

router.post('/upload-eval', eval_uploader.single('pdf'), async (req, res) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'login',
      user: senderGmail,
      pass: senderPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // find the evaluation form for each user
  let eval1 = await EvaluationForm.findOne({
    userID: req.body.userId,
    forID: req.body.forId,
    jobID: req.body.jobId,
  });
  let eval2 = await EvaluationForm.findOne({
    userID: req.body.forId,
    forID: req.body.userId,
    jobID: req.body.jobId,
  });
  let job = await Job.findById(req.body.jobId);
  let user1 =
    (await StudentUser.findById(req.body.userId)) ||
    (await BusinessUser.findById(req.body.userId));
  let user2 =
    (await StudentUser.findById(req.body.forId)) ||
    (await BusinessUser.findById(req.body.forId));
  if (eval2) {
    if (user1.userType === 'business') {
      // user1: BUSINESS email, user2: STUDENT email
      // Eval1: BUSINESS to STUDENT, Eval2: STUDENT to BUSINESS
      let message =
        '<h3>Hi, STUDENT1 STUDENT2</h3><h3>BUSINESS has evaluated you for the JOB position. See the attachment.</h3>';
      message = message.replaceAll('STUDENT1', user2.firstName);
      message = message.replaceAll('STUDENT2', user2.lastName);
      message = message.replace('BUSINESS', user1.businessName);
      message = message.replace('JOB', job.jobTitle);
      let filePath = 'HOST/profile_pdfs/FILENAME';
      filePath = filePath.replace('HOST', address);
      filePath = filePath.replace('FILENAME', eval1.filename);
      const mailOptions = {
        from: senderGmail,
        to: user2.email,
        subject: 'J4I- Internship Evaluation',
        html: message,
        attachments: [
          {
            filename: 'J4I Evaluation.pdf',
            path: filePath,
          },
        ],
      };
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json(error);
        }
      });
      // send the file to BUSINESS (user1) email
      message =
        '<h3>Hi,</h3><h3>STUDENT1 STUDENT2 has evaluated for the JOB position at BUSINESS. See the attachment.</h3>';
      message = message.replaceAll('STUDENT1', user2.firstName);
      message = message.replaceAll('STUDENT2', user2.lastName);
      message = message.replace('BUSINESS', user1.businessName);
      message = message.replace('JOB', job.jobTitle);
      filePath = 'HOST/profile_pdfs/FILENAME';
      filePath = filePath.replace('HOST', address);
      filePath = filePath.replace('FILENAME', eval2.filename);
      const mailOptions2 = {
        from: senderGmail,
        to: user1.email,
        subject: 'J4I- Internship Evaluation',
        html: message,
        attachments: [
          {
            filename: 'J4I Evaluation.pdf',
            path: filePath,
          },
        ],
      };
      await transporter.sendMail(mailOptions2, function (error, info) {
        if (error) {
          return res.json(error);
        }
      });
      return res.json({ msg: 'Please view your email for the evaluation!' });
    } else if (user1.userType === 'student') {
      // user1: STUDENT email, user2: BUSINESS email
      // Eval1: STUDENT to BUSINESS, Eval2: BUSINESS to STUDENT
      let message =
        '<h3>Hi, STUDENT1 STUDENT2</h3><h3>BUSINESS has evaluated you for the JOB position. See the attachment.</h3>';
      message = message.replaceAll('STUDENT1', user1.firstName);
      message = message.replaceAll('STUDENT2', user1.lastName);
      message = message.replace('BUSINESS', user2.businessName);
      message = message.replace('JOB', job.jobTitle);
      let filePath = 'HOST/profile_pdfs/FILENAME';
      filePath = filePath.replace('HOST', address);
      filePath = filePath.replace('FILENAME', eval1.filename);
      const mailOptions = {
        from: senderGmail,
        to: user2.email,
        subject: 'J4I- Internship Evaluation',
        html: message,
        attachments: [
          {
            filename: 'J4I Evaluation.pdf',
            path: filePath,
          },
        ],
      };
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json(error);
        }
      });
      message =
        '<h3>Hi,</h3><h3>STUDENT1 STUDENT2 has evaluated for the JOB position at BUSINESS. See the attachment.</h3>';
      message = message.replaceAll('STUDENT1', user2.firstName);
      message = message.replaceAll('STUDENT2', user2.lastName);
      message = message.replace('BUSINESS', user2.businessName);
      message = message.replace('JOB', job.jobTitle);
      filePath = 'HOST/profile_pdfs/FILENAME';
      filePath = filePath.replace('HOST', address);
      filePath = filePath.replace('FILENAME', eval2.filename);
      const mailOptions2 = {
        from: senderGmail,
        to: user1.email,
        subject: 'J4I- Internship Evaluation',
        html: message,
        attachments: [
          {
            filename: 'J4I Evaluation.pdf',
            path: filePath,
          },
        ],
      };
      await transporter.sendMail(mailOptions2, function (error, info) {
        if (error) {
          return res.json(error);
        }
      });
      return res.json({ msg: 'Please view your email for the evaluation!' });
    }
  } else {
    // remind the forId user2
    if (user1.userType === 'business') {
      let message =
        "<h3>Hi, USERNAME</h3><h3>BUSINESS has evaluated you for the JOB position. To get the evaluation, please evaluate JOB position by following the steps below:</h3><h3>1. Login to J4I.</h3><h3>2. Click on the JOB under Job History in Profile tab.</h3><h3>3. Click 'Evaluate this internship' button.</h3><h3>4. Download the Evaluation form and fill it.</h3><h3>5. Upload the form as pdf.</h3>";
      message = message.replaceAll('USERNAME', user2.firstName);
      message = message.replaceAll('BUSINESS', user1.businessName);
      message = message.replaceAll('JOB', job.jobTitle);
      const mailOptions = {
        from: senderGmail,
        to: user2.email,
        subject: 'J4I- Internship Evaluation',
        html: message,
      };
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json(error);
        } else {
          return res.json({ msg: 'Notified the intern to evaluate!' });
        }
      });
    } else if (user1.userType === 'student') {
      let message =
        "<h3>Hi, BUSINESS </h3><h3>STUDENT1 STUDENT2 has evaluated the JOB position internship. To get the evaluation, please evaluate STUDENT1 STUDENT2 from JOB internship by following the steps below:</h3><h3>1. Login to J4I.</h3><h3>2. Find and Click on the JOB post in My Jobs tab.</h3><h3>3. Scroll down to find and click STUDENT1 STUDENT2 under Interns list.</h3><h3>4. Click 'Evaluate this intern' button.</h3><h3>5. Download the Evaluation form and fill it.</h3><h3>6. Upload the form as pdf.</h3>";
      message = message.replaceAll('STUDENT1', user1.firstName);
      message = message.replaceAll('STUDENT2', user1.lastName);
      message = message.replaceAll('BUSINESS', user2.businessName);
      message = message.replaceAll('JOB', job.jobTitle);
      const mailOptions = {
        from: senderGmail,
        to: user2.email,
        subject: 'J4I- Internship Evaluation',
        html: message,
      };
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json(error);
        } else {
          return res.json({ msg: 'Notified the business to evaluate!' });
        }
      });
    }
  }
});

/**
 * Route get the files uploaded by the user
 * @name get/file/:userID
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.get('/file/:userID', async (req, res) => {
  try {
    let userID = req.params.userID;
    let user =
      (await StudentUser.findById(userID)) ||
      (await BusinessUser.findById(userID));
    if (user === null) {
      res.json({ error: 'User Not Found' });
      return;
    }

    if (user.userType === 'student') {
      let documents = await FileStudentModel.find({ userID });
      res.json(documents);
    } else if (user.userType === 'business') {
      let documents = await FileBusinessModel.find({ userID });
      res.json(documents);
    }
  } catch (error) {
    res.status(500).json({ ...error, critical: 'UserID is invalid' });
  }
});

/**
 * Route serving to get security questions for reset password page.
 * @name get/securityquestions
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.get('/securityquestions/:token', async (req, res) => {
  try {
    let token = req.params.token;
    let user =
      (await StudentUser.findOne({
        $or: [{ confirmationCode: token }],
      })) ||
      (await BusinessUser.findOne({
        $or: [{ confirmationCode: token }],
      }));
    if (!user) {
      let data = {};
      data.role = 'Error';
      data.error =
        "Your link has expired!! Please go to 'Recover Password' page and enter email to get link.";
      return res.json(data);
    }
    let time = user.tokenCreationDate;
    let nowTime = new Date();
    let timeDiff = (nowTime - time) / 1000;
    timeDiff = timeDiff / 60;
    if (timeDiff >= 20) {
      let data = {};
      data.role = 'Error';
      data.error =
        "Your link has expired!! Please go to 'Recover Password' page and enter email to get link.";
      return res.json(data);
    }
    const securityQuestions = [
      user.securityQuestion1,
      user.securityQuestion2,
      user.securityQuestion3,
      user.username,
    ];
    return res.json(securityQuestions);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).send('Server error: ' + err.message);
  }
});

/**
 * Route delete the student file by id
 * @name delete/deletestdfile
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.delete('/deletestdfile/:docID', async (req, res) => {
  try {
    let docID = req.params.docID;
    const deletedFile = await FileStudentModel.findOneAndDelete({ _id: docID });
    const fileName = deletedFile.filename;
    if (fs.existsSync(`${FILE_PATH}/${fileName}`)) {
      fs.unlink(`${FILE_PATH}/${fileName}`, (err) => {
        if (err) throw err;
      });
    }
    res.json({ msg: 'File successfully deleted' });
  } catch (error) {
    res.status(500).json({ ...error, critical: 'Document ID not found' });
  }
});

/**
 * Route delete the business file by id
 * @name delete/deletebnfile
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.delete('/deletebnfile/:docID', async (req, res) => {
  try {
    let docID = req.params.docID;
    const deletedFile = await FileBusinessModel.findOneAndDelete({
      _id: docID,
    });
    const fileName = deletedFile.filename;
    if (fs.existsSync(`${FILE_PATH}/${fileName}`)) {
      fs.unlink(`${FILE_PATH}/${fileName}`, (err) => {
        if (err) throw err;
      });
    }
    res.json({ msg: 'File successfully deleted' });
  } catch (error) {
    res.status(500).json({ ...error, critical: 'Document ID not found' });
  }
});

/**
 * Route serving to verify user
 * @name put/confirm
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.put('/confirm/:confirmationCode', async (req, res) => {
  try {
    let confirmationCode = req.params.confirmationCode;
    let user =
      (await StudentUser.findOne({
        $or: [{ confirmationCode: confirmationCode }],
      })) ||
      (await BusinessUser.findOne({
        $or: [{ confirmationCode: confirmationCode }],
      }));
    if (user) {
      user.status = 'Active';
      await user.save();
      return res.status(200).json({ msg: 'User confirmed and active' });
    }
    return res.json({ errors: 'User does not exist' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).send('Server error: ' + err.message);
  }
});

/**
 * Route get business name and avatar base on the Business ID
 * @name get/busicard/:businessID
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.get('/busicard/:businessID', async (req, res) => {
  try {
    let userID = req.params.businessID;
    let user = await BusinessUser.findById(userID);
    if (user === null) {
      res.json({ error: 'User Not Found' });
      return;
    } else {
      let data = {};
      data.businessName = user.businessName;
      data.avatar = user.avatar;
      return res.json(data);
    }
  } catch (error) {
    res.status(500).json({ ...error, critical: 'UserID is invalid' });
  }
});

/**
 * Route post comment to the DB on the Business ID
 * @name get/postComment/:businessID
 * @function
 * @memberof module:users[api]
 * @see Modules/users[model]
 */
router.post('/postcomment/:businessID', async (req, res) => {
  try {
    let userID = req.params.businessID;
    let user = await BusinessUser.findById(userID);
    if (user === null) {
      res.json({ error: 'User Not Found' });
      return;
    } else {
      const reviewDate = new Date();
      user.publicComments.push({
        name: req.body.name,
        rating: req.body.rating,
        review: req.body.review,
        reviewDate: reviewDate,
        businessName: user.businessName,
        busiID: user._id,
      });
      await user.save();
      return res.status(200).json({ msg: 'Comment saved!' });
    }
  } catch (error) {
    res.status(505).json({ ...error, critical: 'UserID is invalid' });
  }
});

module.exports = router;
