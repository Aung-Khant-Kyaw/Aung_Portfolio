/**
 * This module provides the server creation scripting
 * @module server
 * @see fs
 * @see https
 * @see path
 * @see config
 * @see express
 * @see Modules/db
 * @see cors
 * @see Modules/users[api]
 * @see Modules/jobs[api]
 * @see dotenv
 */
var fs = require('fs');
var https = require('https');
const path = require('path');
var config = require('config');
const express = require('express');
const connectDB = require('./src/utils/db');
const regSuperAdmin = require('./src/utils/regSuperAdmin');
var cors = require('cors');
var CronJob = require('cron').CronJob;
var axios = require('axios');
var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')
var myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

// Setup express app
const app = express();

// Connect Database
connectDB();

// CORS Allows access control Cross-domain request
app.use(cors());

// Init Middleware
app.use(express.json());

app.get('/backend', (req, res) => {
  res.send({ expresS: 'YOU ARE CONNECTED' });
});

// Define static path
app.use('/profile_images', express.static('./profile_images'));

// Define Routes
app.use('/api/users', require('./src/api/users'));
app.use('/api/admins', require('./src/api/admins'));
app.use('/api/superadmin', require('./src/api/superadmin'));
app.use('/api/jobs', require('./src/api/jobs'));
app.use('/api/applications', require('./src/api/applications'));
app.use('/api/email', require('./src/api/email'));

const PORT = process.env.SERVER_PORT || config.get('port');

// // Every day at 12 PM, this function will run to check expiration dates.
// var job = new CronJob(
//   '0 0 12 * * *',
//   async function () {
//     const res = await axios.post(
//       `${process.env.REACT_APP_API}/api/email/check-expirations`
//     );
//     console.log(res.data.msg);
//   },
//   null,
//   true,
//   'America/New_York'
// );

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;