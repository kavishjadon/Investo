const passport = require("passport");

function passportAuthenticate(req, res, next) {
  if (req.isAuthenticated()) return next();
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      if (err) res.locals = "Internal server error, try again later!";
      else res.locals.error = info.message;
      return next();
    } else {
      req.logIn(user, function (err) {
        if (err) res.locals.error = info.message;
        else res.locals.data = user;
        next();
      });
    }
  })(req, res, next);
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.json({ error: "You need to login first to perform this operation" });
}

module.exports = { passportAuthenticate, isAuthenticated };
