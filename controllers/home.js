const AddAdmin = require("../model/profile");
const Student = require("../model/add-student");
const Faculty = require("../model/add-faculty");
const bcrypt = require("bcrypt");

exports.getIndex = (req, res, next) => {
  return res.render("index");
};

exports.postLoginAdmin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  AddAdmin.findOne({ email: email }).then((user) => {
    // console.log("postLoginAdmin :: user:", user);

    if (!user) {
      return;
    }

    bcrypt.compare(password, user.password).then((isMatched) => {
      console.log("isMatched", isMatched);
      if (!isMatched) {
        return;
      }

      req.session.isAdmin = true;
      req.session.isStudent = false;
      req.session.isFaculty = false;
      req.session.user = user;
      console.log("postLoginAdmin :: req.session:", req.session);
      return req.session.save((err) => {
        console.log("postLoginAdmin :: err:", err);
        console.log("postLoginAdmin :: req.session: save", req.session);

        if (!err) {
          return res.redirect("/admin");
        }
      });
    });
  });
};

exports.postFaculty = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(43, email);

  Faculty.findOne({ email: email }).then((user) => {
    console.log(45, user);
    if (!user) {
      return;
    }

    bcrypt.compare(password, user.password).then((isMatched) => {
      console.log("isMatched", isMatched);
      if (!isMatched) {
        return;
      }

      req.session.isFaculty = true;
      req.session.user = user;
      // console.log("req.session", req.session)
      return req.session.save((err) => {
        console.log(26, err);
        if (!err) {
          return res.redirect("/faculty");
        }
        s;
      });
    });
  });
};

exports.postStudent = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(43, email);

  Student.findOne({ email: email }).then((user) => {
    console.log(45, user);
    if (!user) {
      return;
    }

    bcrypt.compare(password, user.password).then((isMatched) => {
      console.log("isMatched", isMatched);
      if (!isMatched) {
        return;
      }

      req.session.isStudent = true;
      req.session.user = user;
      // console.log("req.session", req.session)
      return req.session.save((err) => {
        console.log(26, err);
        if (!err) {
          return res.redirect("/student");
        }
      });
    });
  });
};
