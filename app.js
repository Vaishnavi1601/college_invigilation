const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const User = require("./model/user");

const MONGODB_URI = 'mongodb+srv://vaishnavi123:vaishnavi123@cluster0.7veks.mongodb.net/college?'
const PORT = process.env.PORT || 9000;
const app = express();


const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: 'sessions'
  
})
const homeRoute = require("./routes/home");
const adminRoute = require("./routes/admin");
const facultyRoute = require("./routes/faculty");
const studentRoute = require("./routes/student");

app.set("view engine", "ejs");
app.set("views", "views");
 
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(multer({ storage: fileStorage }).single("file"));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "secretkey", resave: false, saveUninitialized: false, store:store })
);

app.use("/", homeRoute);
app.use("/admin", adminRoute);
app.use("/faculty", facultyRoute);
app.use("/student", studentRoute);

app.use("/", homeRoute);

mongoose
  .connect(
   MONGODB_URI
  )
  .then((result) => {
    app.listen(PORT);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
