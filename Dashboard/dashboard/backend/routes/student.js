const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getStaffById, createStudent ,createCustomStudent} = require("../controllers/teacher");
const { check, validationResult } = require("express-validator");
const { updateActivity, updateAttend, deleteStudent } = require("../controllers/student");

//all of params
router.param("Id", getStaffById);


//create student
router.post(
  "/student/create/:Id",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("roll_no", "Roll no should be number").isNumeric(),
    check("batch", "Please Follow syntax of Batch").isLength(7),
  ],
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createStudent
);


// Update the Activity of Student
router.put('/update/student/activity',updateActivity)

// Update the Attedance of Student
router.put('/update/student/attend',updateAttend)


// Add student Through offline
router.post(
  "/student/custom/",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("roll_no", "Roll no should be number").isNumeric(),
    check("batch", "Please Follow syntax of Batch").isLength(7),
  ],
  createCustomStudent
);



// delete the student
router.put('/student/delete',deleteStudent)


module.exports = router

