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

describe('POST /api/user. FAIL CASES: ', () => {
  const BASE_URL = '/api/users';

  it('400, fail to register a new user -- Email & username are required. Should get 400 return status', async () => {
    const res = await request(app).post(BASE_URL);
    expect(res.status).to.eql(400);
  });

  it('400, fail to register a new user -- Email is required', async () => {
    const httpBody = {
      username: 'logan',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.errors[0].msg).to.eql('Please input a valid email');
  });

  it('400, fail to register a new user -- Email must be a valid email address', async () => {
    const httpBody = {
      username: 'logan',
      email: 'logan',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.errors[0].msg).to.eql('Please input a valid email');
  });

  it('400, fail to register a new user -- Username is required', async () => {
    const httpBody = {
      email: 'logan@gmail.com',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.errors[0].msg).to.eql(
      'Please input a valid username with 5 or more characters'
    );
  });

  it('400, fail to register a new user -- Username must be 5 or more characters', async () => {
    const httpBody = {
      email: 'logan@gmail.com',
      username: 'loga',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.errors[0].msg).to.eql(
      'Please input a valid username with 5 or more characters'
    );
  });

  it('409, conflict with already exist users', async () => {
    const httpBody = {
      email: 'lg.131.dev.131@gmail.com',
      username: 'logann',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.msg).to.eql(
      'User already exists with this email or username'
    );
  });

  it('409, conflict with already exist users', async () => {
    const httpBody = {
      email: 'lg.131.dev@gmail.com',
      username: 'logann131',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.msg).to.eql(
      'User already exists with this email or username'
    );
  });
});

describe('POST /api/user/login. FAIL CASES: ', () => {
  const BASE_URL = '/api/users/login';
  it('400, fail to login -- username & password are required. Should get 400 return status', async () => {
    const res = await request(app).post(BASE_URL);
    expect(res.status).to.eql(400);
  });

  it('400, fail to login -- username is required', async () => {
    const httpBody = {
      password: 'logan',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.errors[0].msg).to.eql('Please include a valid username');
  });

  it('400, fail to login -- password is required', async () => {
    const httpBody = {
      username: 'logan',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.errors[0].msg).to.eql('Password is required');
  });

  it('400, fail to login -- username not found', async () => {
    const httpBody = {
      username: 'J4Iorg',
      password: '123123',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.error).to.eql('User not found');
  });
  it('400, fail to login -- password not match', async () => {
    const httpBody = {
      username: 'logann',
      password: 'r4ptQh$RnBpA?zS4$',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.error).to.eql('Invalid Credentials');
  });
});

describe('POST /api/user/login. SUCCESSFUL CASES: ', () => {
  const BASE_URL = '/api/users/login';

  it('200, successful login', async () => {
    const httpBody = {
      username: 'logann',
      password: 'r4ptQh$RnBpA?zS4$',
    };
    var hash = CryptoJS.HmacSHA512(
      httpBody.password,
      'jobs4interns' + httpBody.username
    );
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    httpBody.password = hashInBase64;

    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.role).to.eql('Success');
  });
});

describe('POST /api/user/check-username. ', () => {
  const BASE_URL = '/api/users/check-username';
  it('User already exists with this username', async () => {
    const httpBody = {
      username: 'logann',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.errors).to.eql('User already exists');
  });

  it('Valid email', async () => {
    const httpBody = {
      username: 'logann131',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.msg).to.eql('valid username');
  });
});

describe('POST /api/user/check-email. ', () => {
  const BASE_URL = '/api/users/check-email';
  it('User already exists with this email', async () => {
    const httpBody = {
      email: 'lg.131.dev@gmail.com',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.errors).to.eql('User already exists');
  });

  it('Valid email', async () => {
    const httpBody = {
      email: 'lg.131.dev.131@gmail.com',
    };
    const res = await request(app).post(BASE_URL).send(httpBody);
    expect(res.body.msg).to.eql('valid email');
  });
});

describe('POST /api/user/update-user. ', () => {
  const BASE_URL = '/api/users/update-user';
  it('User already exists with this email', async () => {
    const httpBody = {
      email: 'lg.131.dev@gmail.com',
    };
    const res = await request(app).put(BASE_URL).send(httpBody);
    expect(res.body.msg).to.eql(
      'User already exists with this email or username'
    );
  });

  it('User already exists with this username', async () => {
    const httpBody = {
      username: 'logann',
    };
    const res = await request(app).put(BASE_URL).send(httpBody);
    expect(res.body.msg).to.eql(
      'User already exists with this email or username'
    );
  });

  it('User should be updated successfully 🥳', async () => {
    const httpBody = {
      _id: '63323a1c552c212704f60ebe',
      username: 'logann',
      email: 'lg.131.dev@gmail.com',
      userType: 'student',
      firstName: 'Viet Nam 🇻🇳',
    };
    const res = await request(app).put(BASE_URL).send(httpBody);
    expect(res.body).to.eql('Successful update user');
  });
});
