const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../schema/User");

function intialize(passport) {
  const authenticateUser = (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      else if (!user)
        return done(null, false, { message: "No user found with that email!" });
      else {
        const result = bcrypt.compareSync(password, user.password);
        if (result) return done(null, user);
        else return done(null, false, { message: "Password incorrect!" });
      }
    });
  };

  const strategy = new LocalStrategy(
    { usernameField: "email" },
    authenticateUser
  );

  passport.use(strategy);
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      if (err) done(err);
      else done(null, user);
    });
  });
}

module.exports = intialize;
