// const express = require("express");
// const app = express(); 
// // const port = 5000;

// app.listen(5000, (error) => {
//     if(!error) console.log("server is running in this port: 5000");
//     else console.log("Error occurred, server can't start.");
// });
// app.use("/", routes);


const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello, How can help you..')
})
app.get('/index', function (req, res) {
  res.send('you have now the main page.')
})

app.post('/add_user',(req, res) =>  {
  res.send('User Details add Successfully.')
})

app.listen(3000, ()=> {
  console.log("Server is running port 3000");
})