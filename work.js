const express = require("express");
const app = express(); 
// const port = 5000;

app.listen(5000, (error) => {
    if(!error) console.log("server is running in this port: 5000");
    else console.log("Error occurred, server can't start.");
});
app.use("/", routes);