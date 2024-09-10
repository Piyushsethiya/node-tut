var fs = require("fs");
var os = require("os");

var user = os.userInfo();

// console.log(user);
// console.log(user.username);

// fs.appendFile('demo.txt', 'Hi i am working this\n', ()=>{
//     console.log('file is saved');
// });
// fs.readFile('demo.txt', ()=>{console.log("i am read this filee!")});

var _ = require("lodash"); 

var data = ['erh',1, 2, 3,2,1,3, 'cfa',]
var filter = _.uniq(data); 
console.log(filter);
console.log(_.isString("name"));