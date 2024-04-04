const app = require("./../../routes/app");
const readAllProducts = require("../../database/lib/readAllProducts");

app.get("/products", (req, res) => {
  readAllProducts((err, products) => {
    if (err) res.status(500).send(err);
    else res.json(products);
  });
});
