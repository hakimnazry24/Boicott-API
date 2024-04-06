const path = require("path");
const express = require("express");
const app = require("./routes/app");
const PORT = 8080;

require("./middleware");
require("./routes/routes");

app.listen(process.env.PORT || PORT, () =>
  console.log(`SERVER STARTED AT PORT ${process.env.PORT || PORT}...`)
);
