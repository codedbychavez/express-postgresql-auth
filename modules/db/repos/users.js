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
      .then((user) => {
        return callback(null, user);
      })
      .catch((err) => {
        return callback(err, null);
      })
  }
}

module.exports = UsersRepository;