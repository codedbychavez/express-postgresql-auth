const { users: sql } = require('../sql');

class UsersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  all() {
    return this.db.any(sql.all);
  }
}

module.exports = UsersRepository;