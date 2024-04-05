const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./products.db");

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS Product(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, serial_number INTEGER NOT NULL, isBoycott INTEGER NOT NULL, evidence_link TEXT NOT NULL)`
  );
});

module.exports = db;
