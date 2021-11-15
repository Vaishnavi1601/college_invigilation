const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require("multer");

const PORT = process.env.PORT || 9000;
const app = express();

const adminRoute = require("./routes/admin");
const facultyRoute = require('./routes/faculty');
const studentRoute = require('./routes/student');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(multer({ storage: fileStorage }).single("file"));

app.use(express.static(path.join(__dirname, "public")))

app.use('/admin', adminRoute);
app.use('/faculty', facultyRoute);
app.use('/student', studentRoute);

mongoose
  .connect(
    'mongodb+srv://vaishnavi123:vaishnavi123@cluster0.7veks.mongodb.net/college?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(PORT);
    console.log('connected');
  })
  .catch(err =>{
    console.log(err);
  })


 