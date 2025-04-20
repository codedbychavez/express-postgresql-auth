const pgPromise = require('pg-promise');
const dbConfig = require('./dbconfig.json');
const { Users } = require('./repos');

const initOptions = {
  extend(obj, dc) {
    obj.users = new Users(obj, pgp);
  }
}

// Initializing the library;
const pgp = pgPromise(initOptions);

// Creating the database instance;
const db = pgp(dbConfig);

// Test connection
db.one('SELECT NOW()')
  .then(result => {
    console.log('Connection successful:', result);
  })
  .catch(error => {
    console.error('Connection failed:', error.message || error);
  });

module.exports = {db};