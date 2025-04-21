const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const { join } = require('path');
const crypto = require('crypto');

// Add authentication module
const { passport } = require('./modules/auth');

// Add database module
const { db } = require('./modules/db');

// Middleware
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));
app.use(session({
  secret: 'express-postgresql-auth',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

app.use(passport.authenticate('session'));

app.post("/auth/login", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.post("/auth/signout", function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.json({ message: "Signout successful" });
  })
});

app.post("/auth/signup", function (req, res, next) {
  const salt = crypto.randomBytes(16);

  const password = req.body.password;

  // TODO: Generate a unique userID
  const userId = Date.now();

  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
    if (err) { return next(err); }
    await db.users.insert(userId, username, hashedPassword, salt, function (err, user) {
      if (err) { return res.json({ message: 'Failed to sign up' }) };
      if (user) {
        return res.json({ user: user });
      }
    })
  })
});

app.get('/', async (req, res) => {
  res.send('Hello World');
})


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})