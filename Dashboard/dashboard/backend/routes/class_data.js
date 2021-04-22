var express = require("express");
const { createClass , updateActivity } = require("../controllers/class_data");
var router = express.Router();

// creating the class
router.post(
  "/class/create",
  createClass
);


// updating the record
router.put("/class/update",updateActivity)


module.exports = router;
