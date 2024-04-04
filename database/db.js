const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./products.db");

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS Product(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, serial_number INTEGER NOT NULL)`
      );
    db.run(`INSERT INTO Product(name, serial_number) VALUES(?, ?)`, ["testing_name", 123132]);
    db.run(`INSERT INTO Product(name, serial_number) VALUES(?, ?)`, ["testing_name", 123132]);
    db.run(`INSERT INTO Product(name, serial_number) VALUES(?, ?)`, ["testing_name", 123132]);
    db.run(`INSERT INTO Product(name, serial_number) VALUES(?, ?)`, ["testing_name", 123132]);
    db.run(`INSERT INTO Product(name, serial_number) VALUES(?, ?)`, ["testing_name", 123132]);
    db.run(`INSERT INTO Product(name, serial_number) VALUES(?, ?)`, ["testing_name", 123132]);

});


module.exports = db;
