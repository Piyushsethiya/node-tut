const express = require("express");
const router = express.Router();
const person = require("../model/person");
const logRequest = require('../controller/work');
const {jwtAuthMiddleware, genrateToken} = require('../config/jwt');
// Add
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();
    console.log("Data saved");

    const payload = {
      id: response.id,
      username : response.username
    }
    console.log(JSON.stringify(payload))
    const token = genrateToken(payload);
    console.log("Token is: " + token);
    res.status(200).json({response: response, token: token});
    // res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error." });
  }
});

// Login 

router.post('/login', async (req, res)=>{
  try{
    const {username, password} = req.body;
    const user = await person.findOne({username: username});
    if(!user || !(await user.password)){
      return res.status(401).json({error: 'Invalid username and password.'})
    }

    const payload = {
      id: user.id,
      username: user.username
    }

    const token = genrateToken(payload);
    res.json({token});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error.'});
  }
})

// profile 

router.get('/profile', jwtAuthMiddleware, async (req,res)=> {
  try{
    const userData = req.user;
    console.log('User Data: ' , userData);

    const userid = userData.id;
    const user = await person.findById(userid);
    // console.log('Profile Data');
    res.status(200).json({user});
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error."});
  }
})

// fetch
router.get("/", /*jwtAuthMiddleware, open this for work on login*/ async (req, res) => {
  try {
    const data = await person.find();
    console.log("data find successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error." });
  }
});

//  fetch with parameter

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    // console.log(worktype);
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await person.find({ work: worktype });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error." });
  }
});

// update 

router.put('/:id', async (req,res)=> {
  try{
  const person_id = req.params.id;
  const updatePersonData = req.body;
  const response = await person.findByIdAndUpdate(person_id, updatePersonData, {
    new: true,
    runValidators: true,
  });
  if(!response){
    return res.status(404).json({error: 'Person Not Found'});
  }
  console.log('Data Updated.');
  res.status(201).json(response);
}catch(err){
  console.log(err);
  res.status(500).json({ error: "Internal server Error." });
}
})

//delete 

router.delete('/:id', async (req,res)=>{
  try{
    const person_id = req.params.id
    const response = await person.findByIdAndDelete(person_id);
    if(!response){
      return res.status(404).json({error: 'Person Not Found'});
    }
    console.log('data deleted');
    res.status(200).json({message: 'Data Deleted Successfully'})
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});

  }
})
module.exports = router;