const express = require("express");
const router = express.Router();

const { getStaffById, getClassRanking, getAdminStack } = require("../controllers/teacher")
const { isSignedIn, isAuthenticated, isTeacher, isAdmin } = require("../controllers/auth")
const { getAllStudentTeacher, getAllStudentAdmin,getAllClassesTecher } = require("../controllers/teacher")


// Getting the Staff By ID
router.param("Id", getStaffById)


// Getting All student of one class by teacher
router.get('/get/student/teacher/:Id/:name', isSignedIn , isAuthenticated,  isTeacher ,getAllStudentTeacher)

// Getting All student of one class by Admin
router.get('/get/student/admin/:Id', isSignedIn , isAuthenticated,isAdmin,getAllStudentAdmin)

// getting the classes of teacher
router.get('/get/classes/teacher/:Id',isSignedIn,isAuthenticated,isTeacher,getAllClassesTecher)


// getting the class Ranking
router.get('/get/class/rank/:name/:Id',isSignedIn,isAuthenticated,isTeacher, getClassRanking)


// getting the admin Stack 

router.get('/get/admin/rank/:Id',isSignedIn,isAuthenticated,isAdmin,getAdminStack)


// exporting the module
module.exports = router;
