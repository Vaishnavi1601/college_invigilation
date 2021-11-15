const express = require("express");

const router = express.Router();

router.get("/clear-attendence", (req, res, next) =>
  res.render("faculty/clear-attendence", { pageTitle: "clear-attendence" })
);
router.get("/ia-marks", (req, res, next) =>
  res.render("faculty/ia-marks", { pageTitle: "IA Marks" })
);
router.get("/", (req, res, next) =>
  res.render("faculty/index", { pageTitle: "Index" })
);
router.get("/profile", (req, res, next) =>
  res.render("faculty/profile", { pageTitle: "Profile" })
);
router.get("/shortage-attendence", (req, res, next) =>
  res.render("faculty/shortage-attendence", {
    pageTitle: "shortage attendence",
  })
);

module.exports = router;
