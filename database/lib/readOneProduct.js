const db = require("./../db");

function readOneProduct(id, callback) {
  const sql = "SELECT * FROM Product WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) console.log(err);
    callback(row);
  });
}

module.exports = readOneProduct;
