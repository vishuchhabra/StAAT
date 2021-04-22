require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan')


//My routes
const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/student");
const classRoutes = require('./routes/class_data')
const path = require('path')


//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'))

//My Routes
app.use("/api", teacherRoutes);
app.use("/api", studentRoutes);
app.use("/api", authRoutes);
app.use("/api", classRoutes);

//PORT
const port = process.env.PORT || 4001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Starting a server
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
