
module.exports = (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.currentUserName = "user name";
    res.locals.typeOfUser = "user type";
    if(res.locals.isAuthenticated){
      res.locals.currentUserName = req.user.name;
      res.locals.typeOfUser = req.session.typeOfUser;
    }
    next();
  }
