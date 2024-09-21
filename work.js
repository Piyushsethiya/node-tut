const express = require("express");
const app = express();
const db = require('./db.js');

const personRoutes   = require('./src/routes/PersonRoutes.js');
const menuRoutes = require("./src/routes/MenuRoutes.js");

app.get("/", function (req, res) {
  res.send("Hello, Welcome node js api for curd operation..");
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, () => {
  console.log("Server is running port 3000");
});
