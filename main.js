const util = require("./database/util");
const routes = require("./routes/routes")
const db = require("./database/db");
const app = require("./routes/app");
const PORT = 8080;


app.listen(process.env.PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}...`));