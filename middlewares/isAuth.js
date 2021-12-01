module.exports.isAuthAdmin = (req, res, next) => {
  if(!req.session.isAdmin){
    res.redirect("/");
  }
  next();
};

module.exports.isAuthStudent = (req, res, next) => {
  if(!req.session.isStudent){
    res.redirect("/");
  }
  next();
};

module.exports.isAuthFaculty = (req, res, next) => {
  if(!req.session.isFaculty){
    res.redirect("/");
  }
  next();
};