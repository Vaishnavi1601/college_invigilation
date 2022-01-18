const Student = require("../model/add-student");
const Exam = require("../model/add-exam");
const Faculty = require("../model/add-faculty");
const Attendence = require("../model/clear-attendence");
const ShoratgeAttendence = require("../model/shoratge-attendence");
const UniversityExam = require("../model/universityExam");
const Admin = require("../model/profile");
const bcryptjs = require("bcrypt");

exports.getAddStudent = (req, res, next) => {
  res.render("admin/add-student", {
    pageTitle: "Add Student",
    path: "/admin/add-student",
  });
};

exports.postEditStudent = (req, res, next) => {
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedUsn = req.body.usn;
  const updatedBranch = req.body.branch;
  const updatedSem = req.body.sem;
  const studentId = req.body._id;
  Student.findById(studentId)
    .then((student) => {
      (student.name = updatedName),
        (student.email = updatedEmail),
        (student.usn = updatedUsn),
        (student.branch = updatedBranch),
        (student.sem = updatedSem);
      return student.save();
    })
    .then((result) => {
      return res.redirect("/admin/view-student");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddStudent = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const usn = req.body.usn;
  const branch = req.body.branch;
  const sem = req.body.sem;

  Student.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("admin/add-student");
      }
      return bcryptjs.hash(password, 12);
    })
    .then((hashedPassword) => {
      const student = new Student({
        name: name,
        email: email,
        password: hashedPassword,
        usn: usn,
        branch: branch,
        sem: sem,
      });
      student.save().then((result) => {
        res.redirect("/admin/view-student");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddExam = (req, res, next) => {
  Exam.find().then((exams) => {
    res.render("admin/add-exam", {
      pageTitle: "Add Exam",
      path: "/admin/add-exam",
      exams: exams,
    });
  });
};

exports.postDeleteExam = (req, res, next) => {
  const examId = req.params.exam_id;
  console.log();
  Exam.findByIdAndRemove(examId)
    .then(() => {
      res.redirect("/admin/add-exam");
    })
    .catch((err) => console.log(err));
};

exports.postAddExam = (req, res, next) => {
  const examTitle = req.body.examTitle;
  const branch = req.body.branch;
  const sem = req.body.sem;
  const date = req.body.date;
  const slot = req.body.slot;

  const exam = new Exam({
    examTitle: examTitle,
    branch: branch,
    sem: sem,
    date: date,
    slot: slot,
  });
  exam
    .save()
    .then((result) => {
      res.redirect("/admin/add-exam");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getExamTimeTable = (req, res, next) => {
//   const exam_id = req.params.exam_id;

//   Exam.findById(exam_id).then((examDetails) => {
//     console.log(examDetails);
//   });
// };

exports.getAddFaculty = (req, res, next) => {
  res.render("admin/add-faculty", {
    pageTitle: "Add Faculty",
    path: "/admin/add-faculty",
  });
};

exports.postAddFaculty = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  Faculty.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        console.log(userDoc);
        return res.redirect("/admin/add-faculty");
      }
      return bcryptjs.hash(password, 12);
    })
    .then((hashedPassword) => {
      const faculty = new Faculty({
        name: name,
        email: email,
        password: hashedPassword,
      });
      faculty.save().then((result) => {
        res.redirect("/admin/view-faculty");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditFaculty = (req, res, next) => {
  const updatedName = req.body.name;
  console.log(updatedName);
  const updatedEmail = req.body.email;
  console.log(updatedEmail);
  console.log(req.body);

  const facultyId = req.body._id;
  console.log(128, facultyId);
  Faculty.findById(facultyId)
    .then((faculty) => {
      console.log(130, faculty);
      faculty.name = updatedName;
      faculty.email = updatedEmail;
      return faculty.save();
    })
    .then((result) => {
      return res.redirect("/admin/view-faculty");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getClearAttendence = (req, res, next) => {
  Attendence.find().then((clearAttendence) => {
    res.render("admin/clear-attendence", {
      pageTitle: "Clear Attendence",
      clearAttendence: clearAttendence,
    });
  });
};

exports.postClearAttendence = (req, res, next) => {
  const branch = req.body.branch;
  const sem = req.body.sem;
  const file = req.file;

  const fileUrl = file.path;
  // console.log(125, fileUrl)
  const cAttendence = new Attendence({
    branch: branch,
    sem: sem,
    file: fileUrl,
  });

  // console.log(65, cAttendence);
  cAttendence
    .save()
    .then((result) => {
      // console.log("Attendence");
      res.redirect("/admin/clear-attendence");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getViewStudent = (req, res, next) => {
  Student.find().then((students) => {
    res.render("admin/view-student", {
      students: students,
      pageTitle: "View Student",
      path: "/admin/view-student",
    });
  });
};

exports.getViewFaculty = (req, res, next) => {
  Faculty.find().then((faculties) => {
    res.render("admin/view-faculty", {
      faculties: faculties,
      pageTitle: "View Faculty",
      path: "/admin/view-faculty",
    });
  });
};

exports.getViewExam = (req, res, next) => {
  Exam.find().then((exams) => {
    console.log(174, exams);

    res.render("admin/view-exam", {
      pageTitle: "View Exam",
      path: "/admin/view-exam",
      exams: exams,
    });
  });
};

exports.postDeleteStudent = (req, res, next) => {
  const studentId = req.params.std_id;
  console.log(188, studentId);
  Student.findByIdAndRemove(studentId)
    .then(() => {
      console.log("Deleted Student");
      res.redirect("/admin/view-student");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteFaculty = (req, res, next) => {
  const facultyId = req.params.faculty_id;
  console.log(198, facultyId);
  Faculty.findByIdAndRemove(facultyId)
    .then(() => {
      res.redirect("/admin/view-faculty");
    })
    .catch((err) => console.log(err));
};

exports.deleteClearAttendence = (req, res, next) => {
  const cAttendenceId = req.params.cAttendence_id;
  Attendence.findByIdAndRemove(cAttendenceId)
    .then(() => {
      console.log("attendence deleted");
      res.redirect("/admin/clear-attendence");
    })
    .catch((err) => console.log(err));
};

exports.getShortageAttendence = (req, res, next) => {
  ShoratgeAttendence.find().then((shortageAttendence) => {
    res.render("admin/shortage-attendence", {
      shortageAttendence: shortageAttendence,
      pageTitle: "Shortage Attendence |Admin Dashboard",
      path: "/admin/shortage-attendence",
    });
  });
};

exports.postShoratgeAttendence = (req, res, next) => {
  const branch = req.body.branch;
  const sem = req.body.sem;
  const shortageAttendence = req.file;
  const fileUrl = shortageAttendence.path;
  const sAttendence = new ShoratgeAttendence({
    branch: branch,
    sem: sem,
    file: fileUrl,
  });

  sAttendence
    .save()
    .then((result) => {
      res.redirect("/admin/shortage-attendence");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteShortageAttendence = (req, res, next) => {
  const shortageAttendenceId = req.params.sAttendence_id;
  ShoratgeAttendence.findByIdAndRemove(shortageAttendenceId)
    .then(() => {
      res.redirect("/admin/shortage-attendence");
    })
    .catch((err) => console.log(err));
};

exports.getUniversityExam = (req, res, next) => {
  UniversityExam.find().then((universityExam) => {
    res.render("admin/university-exam", {
      pageTitle: "University Exam",
      path: "/admin/university-exam",
      universityExam: universityExam,
    });
  });
};

exports.postUniversityExam = (req, res, next) => {
  const title = req.body.title;
  const universityExam = req.file;
  const universityExamUrl = universityExam.path;
  const uExam = new UniversityExam({
    title: title,
    file: universityExamUrl,
  });

  uExam
    .save()
    .then((result) => {
      res.redirect("/admin/university-exam");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteUniversityExam = (req, res, next) => {
  const universityId = req.params.university_id;
  UniversityExam.findByIdAndRemove(universityId)
    .then(() => {
      console.log("Deleted university exam");
      res.redirect("/admin/university-exam");
    })
    .catch((err) => console.log(err));
};

exports.getProfile = (req, res, next) => {
  Admin.find().then((admins) => {
    console.log(362, admins);
    res.render("admin/profile", {
      pageTitle: "Profile",
      path: "/admin/profile",
      admins: admins,
    });
  });
};

exports.postProfile = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  Admin.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("admin/profile");
      }

      return bcryptjs.hash(password, 12);
    })
    .then((hashedPassword) => {
      const profile = new Admin({
        name: name,
        email: email,
        password: hashedPassword,
      });
      profile.save().then((result) => {
        res.redirect("/admin/profile");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteAdmin = (req, res, next) => {
  const adminId = req.params.admins_id;
  console.log(400, adminId);
  Admin.findByIdAndRemove(adminId)
    .then(() => {
      res.redirect("/admin/profile");
    })
    .catch((err) => console.log(err));
};

exports.adminLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
};
