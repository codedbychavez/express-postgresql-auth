# Express + PostgreSQL + Basic Auth

Welcome to an advanced demo of Express + PostSQL + Basic Auth.

## Getting started

1. Add your PostgreSQL database configurations to `modules/db/dbconfig.json`.

2. Run the app using:

```bash
npm run dev
```

3. Check is the app connected successfully to the database. `module/db/index.js` logs the status of the database connection:

```js
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
```

## API Endpoints

### POST `auth/signup`

```
http://localhost:3000/auth/signup
```

```json
// Request Body
{
  "username": "joe",
  "password": "password"
}
```

### POST `auth/login`

```json
// Request Body
{
  "username": "joe",
  "password": "password"
}
```

### POST `auth/logout`

```json
// Request Body

```

## Helpful Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/): The official docs for PostgreSQL, the powerful open-source relational database.

- [pg-promise](https://vitaly-t.github.io/pg-promise/index.html): A PostgreSQL client library for Node.js with a clean promise-based interface. Great for use with Express.

- [Passport.js](https://www.passportjs.org/): User Authentication.
