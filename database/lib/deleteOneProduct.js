const db = require("../db");

function deleteOneProduct(id) {
    const sql = "DELETE FROM Product WHERE id = ?";
    db.run(sql, [id], (err) => {
        if (err) throw err;
    });
}

module.exports = deleteOneProduct;