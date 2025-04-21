const { users: sql } = require('../sql');

class UsersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  all() {
    return this.db.any(sql.all);
  }

  findByUsername(username, callback) {
    this.db.oneOrNone(sql.find, username)
      .then(function (user) {
        return callback(null, user);
      })
      .catch(function (err) {
        return callback(err, null);
      })
  }

  insert(userId, username, hashedPassword, salt, callback) {
    this.db.one(sql.insert, [userId, username, hashedPassword, salt])
      .then(function (user) {
        return callback(null, user);
      })
      .catch(function (err) {
        return callback(err, null);
      })

  }

}

module.exports = UsersRepository;