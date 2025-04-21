const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const { join } = require('path');

// Add authentication module
const { passport } = require('./modules/auth');


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

app.post("/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.post("/auth/signout", (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.json({ message: "Signout successful" });
  })
});

app.get('/', async (req, res) => {
  res.send('Hello World');
})


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})