const db = require("../db");

function readAllProducts(callback) {
    const sql = "SELECT * FROM Product";
    db.all(sql, [], (err, rows) => {
        if (err) throw err;
        callback(rows);
    });
}

module.exports = readAllProducts;