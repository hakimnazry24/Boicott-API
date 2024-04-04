const readOneProduct = require("./../../database/lib/readOneProduct");
const app = require("./../app");

app.get("/product/:id", (req, res) => {
    const params = req.params.id;
    readOneProduct(params, (row) => {
        res.json(row);
    });
});