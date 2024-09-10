function callback(){
    console.log("callback function are used");
}
const add = (a,b,call) => {     // used in arrow function 
    var res = a+b;
    console.log("result: " + res);
    call();
}
add(12,23, callback);