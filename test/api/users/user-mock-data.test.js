const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const CryptoJS = require('crypto-js');

const app = require('../../../server');
const connectDB = require('../../../src/utils/db');
before(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
});

after(async () => {
  await mongoose.disconnect();
});

// Run this particular unit test ONLY ONCE. Comment it out to keep on testing other unit tests
// If you wish to execute it more than once, httpBody modification is required
describe('POST /api/user. SUCCESSFUL CASES: ', () => {
  const BASE_URL = '/api/users';
  it('200, should register user to database', async () => {
    const httpBody = {
      userType: 'student',
      addressCity: 'Oswego',
      addressState: 'AL',
      addressStreet: '15 Union Rd',
      addressStreet2: '721',
      addressZip: '13126',
      confirmPassword: 'r4ptQh$RnBpA?zS4$',
      email: 'lg.131.dev@gmail.com',
      firstName: 'Logan',
      gpa: '4.0',
      gradYear: '2023',
      institution: 'SUNY Oswego',
      lastName: 'Nguyen',
      password: 'r4ptQh$RnBpA?zS4$',
      securityAnswer1: 'Lu',
      securityAnswer2: 'Le Duan',
      securityAnswer3: 'Le Duan',
      securityQuestion1: 'What is the name of your first pet?',
      securityQuestion2: 'What is the street of your first home?',
      securityQuestion3: 'What street did you live on in third grade?',
      userPhoneNumber: '2533917245',
      username: 'logann',
    };
    var hash = CryptoJS.HmacSHA512(
      httpBody.password,
      'jobs4interns' + httpBody.username
    );
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    httpBody.password = hashInBase64;
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.msg).to.eql('User successfully created');
  });
});
