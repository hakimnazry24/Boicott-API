const app = require("../app");

app.get("/", (req, res) => {
    console.log("hello world");
    res.send("hello");
});
