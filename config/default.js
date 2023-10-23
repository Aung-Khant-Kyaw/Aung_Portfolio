/**
 * This module provides default information to the application's modules.
 * @module default
 * @version 0.1
 */
module.exports = {
  debug: true,
  staticMaxAge: 0,
  port: 5000,
  session: {
    secret: 'hns7eyshfkt9384hdfkfd0385756stgbdmf7364gfdkf76rh',
    cookieMaxAge: null,
  },
  api: {
    name: 'Aung Rest API',
    version: '1.0.0',
  },
  db: {
    connection: {
      host: 'localhost',
      user: 'root',
    },
  },
  express: {
    url: 'https://localhost:5000',
  },
};
