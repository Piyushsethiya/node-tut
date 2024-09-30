const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true, 
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    required: true,
    enum: ["chef", "manager", "waiter"],
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// personSchema.pre('save', async (next)=>{
//   const person = this;
//   if(!person.isModified('person')) return next();
//   try{
//     const salt = await bcrypt.genSalt(10);
//     const hasedPassword = await bcrypt.hased(person.password, salt);
//     person.password = hasedPassword; 
//     next();
//   }catch(err){
//     next(err);
//   }
// })

// personSchema.method.comparePassword = async (candidatePassword)=>{
//   try{
//     const isMatch = await bcrypt.compare(candidatePassword, this.password);
//     return isMatch;
//   }catch(err){
//     throw err;
//   }
// }
const person = mongoose.model("Person", personSchema);
module.exports = person;
