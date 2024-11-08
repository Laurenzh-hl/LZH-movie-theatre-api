const express = require("express");
const routes = require("../routes/index");
const app = express();

app.use("/users", routes.users);
app.use("/shows", routes.shows);

module.exports = app;