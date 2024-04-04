const sqlite = require("sqlite3");
const util = require("./util/util");
const routes = require("./routes/routes")
const app = require("./routes/app");
const PORT = 8080;


app.listen(PORT, () => console.log("SERVER STARTED ..."));