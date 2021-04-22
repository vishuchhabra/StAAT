const Teacher = require("../models/teacher");
const Student = require('../models/student')
const ClassData = require('../models/class_data')
const { check, validationResult } = require("express-validator");
const { ceil } = require("lodash");


// Getting the Staff By ID
exports.getStaffById = (req, res, next, id) => {
  Teacher.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No Teacher found in DB"
      });
    }
    req.profile = user;
    next();
  });
};



//  Get all student Based on Class by Teacher

exports.getAllStudentTeacher = (req, res) => {

  // define the limit
  let limit = req.query.limit ? parseInt(req.query.limit) : 100000;

  let sortBy = "roll_no";

  Student.find({class_name:req.params.name})
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      console.log(data)
      res.json(data);
    });
};


// Get Ranking of the classs

exports.getClassRanking = async (req, res) => {

    const class_name = req.params.name

    // get number of student of given class
  try{
      const students =await  Student.find({class_name})

      const len =students.length

      if(len===0){
          return res.status(200).json({
            msg: "No Student"
          });
      }

      ClassData.findOne({name:class_name}).then(data=>{
          return res.status(200).json({
            msg:` ${ceil(data.count/len)}`
          })
      })
      .catch(err=>{
        console.log(err)
          return res.status(400).json({
            msg:"Error With Database"
          })
      })

  }
  // if error present
  catch(error){
    console.log(error)
    return res.status(400).json({
      error: "Error in Searching"
    });
  }
};


//  Get all student Based on Class by Admin

exports.getAllStudentAdmin = (req, res) => {

  // define the limit
  let limit = req.query.limit ? parseInt(req.query.limit) : 100000;

  let sortBy = "roll_no";

  Student.find({class:req.body.class})
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(data);
    });
};



// creating the student

exports.createStudent = (req,res)=>{
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  // addiing student to database
  const student = new Student(req.body)
  student.save((err, student) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: "Problem With Storing in Database"
      });
    }
    res.json({
      name: student.name,
      roll_no: student.roll_no,
      id: student._id
    });
  })
}

// get classess of teacher

exports.getAllClassesTecher = (req,res)=>{
  // getting the classes based on ID
  res.status(200).json({
    clasess: req.profile.classes
  })
}


// adding createCustomStudent data

exports.createCustomStudent = (req,res)=>{
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  // checking condition
  const local_password="1016594680";

  if(local_password!=req.body.password){
      return res.status(400).json({
          error:"Access Denied"
      })
  }

  // addiing student to database
  const student = new Student(req.body)
  student.save((err, student) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: "Roll No Already Present"
      });
    }
    res.json({
      name: student.name,
      roll_no: student.roll_no,
      id: student._id
    });
  })
}


// Getting the admin Stack

exports.getAdminStack = async (req,res)=>{

  // Getting the activity
  try{

      // For checking the count of activty
      let First =0,Second = 0,Third =0,Fourth =0, Fifth =0,Sixth =0,Seventh =0,Eighth =0,Ninth=0,Tenth =0
      const classes = await ClassData.find()

      await classes.forEach(temp=>{
        if(temp.name==="First"){
          First+=temp.count
        }
        if(temp.name==="Second"){
          Second+=temp.count
        }
        if(temp.name==="Third"){
          Third+=temp.count
        }
        if(temp.name==="Fourth"){
          Fourth+=temp.count
        }
        if(temp.name==="Fifth"){
          Fifth+=temp.count
        }
        if(temp.name==="Sixth"){
          Sixth+=temp.count
        }
        if(temp.name==="Seventh"){
          Seventh+=temp.count
        }
        if(temp.name==="Eighth"){
          Eighth+=temp.count
        }
        if(temp.name==="Ninth"){
          Ninth+=temp.count
        }
        if(temp.name==="Tenth"){
          Tenth+=temp.count
        }
      })

      // Student count for all 
      let First_c =0, Second_c =0, Third_c =0,Fourth_c =0,Fifth_c =0,Sixth_c =0,Seventh_c =0,Eighth_c =0,Ninth_c =0,Tenth_c =0;

      // Getting the All Students
      const students = await Student.find()

      // apply the looping
      await students.forEach(student =>{
        if(student.class_name==="First"){
          First_c+=1
        }
        if(student.class_name==="Second"){
          Second_c+=1
        }
        if(student.class_name==="Third"){
          Third_c+=1
        }
        if(student.class_name==="Fourth"){
          Fourth_c+=1
        }
        if(student.class_name==="Fifth"){
          Fifth_c+=1
        }
        if(student.class_name==="Sixth"){
          Sixth_c+=1
        }
        if(student.class_name==="Seventh"){
          Seventh_c+=1
        }
        if(student.class_name==="Eighth"){
          Eighth_c+=1
        }
        if(student.class_name==="Ninth"){
          Ninth_c+=1
        }
        if(student.class_name==="Tenth"){
          Tenth_c+=1
        }
      })
      // returning result
      if(First_c){
          First =ceil(First/First_c)
      }
      else{
        First = 0;
      }

      // returning result
      if(Second_c){
          Second =ceil(Second/Second_c)
      }
      else{
        Second = 0;
      }
      // returning result
      if(Third_c){
        Third =ceil(Third/Third_c)
      }
      else{
        Third = 0;
      }
        // returning result
      if(Fourth_c){
        Fourth =ceil(Fourth/Fourth_c)
      }
      else{
        Fourth = 0;
      }

      // returning result
      if(Fifth_c){
        Fifth =ceil(Fifth/Fifth_c)
      }
      else{
        Fifth = 0;
      }

      // returning result
      if(Sixth_c){
          Sixth =ceil(Sixth/Sixth_c)
      }
      else{
        Sixth = 0;
      }

      // returning result
      if(Seventh_c){
        Seventh =ceil(Seventh/Seventh_c)
      }
      else{
        Seventh = 0;
      }

      // returning result
      if(Eighth_c){
        Eighth =ceil(Eighth/Eighth_c)
      }
      else{
        Eighth = 0;
      }

      // returning result
      if(Ninth_c){
        Ninth =ceil(Ninth/Ninth_c)
      }
      else{
        Ninth = 0;
      }
      // returning result
      if(Tenth_c){
        
        Tenth =ceil(Tenth/Tenth_c)
      }
      else{
        Tenth = 0;
      }

      //Final Response
      res.status(200).json({
        msg:[First,Second,Third,Fourth,Fifth,Sixth,Seventh,Eighth,Ninth,Tenth]
      })
  }
  catch(error){
    res.status(400).json({
      error:"Error In DB"
    })
  }

}





