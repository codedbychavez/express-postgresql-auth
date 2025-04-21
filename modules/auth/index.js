const crypto = require('crypto');
const passport = require('passport');

let LocalStrategy = require('passport-local');

const { db } = require('../../modules/db');

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  await db.users.findByUsername(username, function (err, user) {
    if (err) { return cb(err) }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    const storedSalt = Buffer.from(user.salt);

    crypto.pbkdf2(password, storedSalt, 310000, 32, 'sha256', function (err, hashedPassword) {
      if (err) { return cb(err); }

      const storedPasswordHash = Buffer.from(user.hashed_password, 'hex');

      if (!crypto.timingSafeEqual(storedPasswordHash, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password' });
      }

      return cb(null, user);
    });
  });
}));


passport.serializeUser((user, cb) => {
  process.nextTick(() => cb(null, { id: user.id, username: user.username }));
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

module.exports = { passport };