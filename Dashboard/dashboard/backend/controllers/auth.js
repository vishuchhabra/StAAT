const Teacher = require("../models/teacher");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  // registering the user
  const teacher = new Teacher(req.body);
  teacher.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error:"Problem With Storing in Database"
      });
    }
    res.json({
      name: user.first_name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  Teacher.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role, classes } = user;
    return res.json({ token, user: { _id, name, email, role ,classes} });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};


// Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});


// Is Authenticated
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};


// role 2 is for admin
exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 2) {
    return res.status(403).json({
      error: "Access denied"
    });
  }
  next();
};


// role 1 is for teacher
exports.isTeacher = (req, res, next) => {
  if (req.profile.role !== 1) {
    return res.status(403).json({
      error: "You are not Teacher, Access denied"
    });
  }
  next();
};


