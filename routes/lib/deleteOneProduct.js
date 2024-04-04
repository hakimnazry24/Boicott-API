const app = require("../app");
const deleteOneProduct = require("./../../database/lib/deleteOneProduct");

app.delete("/product/:id", (req, res) => {
    const params = req.params.id;
    deleteOneProduct(params);
    res.send("successfully deleted");
});
