const express = require("express");
const router = express.Router();
const person = require("../model/person");
  
// Add
router.post("/", async (req, res) => {
  try {


    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error." });
  }
});

// fetch
router.get("/", async (req, res) => {
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