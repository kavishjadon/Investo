const express = require("express");
const User = require("../schema/User");
const bcrypt = require("bcrypt");
const { isAuthenticated, passportAuthenticate } = require("../middleware");
const router = express.Router();

router.get("/details", isAuthenticated, (req, res) => {
  res.json({ data: req.user });
});

router.post("/register", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User(req.body);
  newUser.save({}, (err, user) => {
    if (err) res.json({ error: err });
    else res.json({ data: user });
  });
});

router.post("/login", passportAuthenticate, (req, res) => {
  if (req.user) res.locals.data = req.user;
  res.json(res.locals);
});

router.put("/invest", isAuthenticated, (req, res) => {
  if (req.user.referred_by) {
    User.updateOne(
      { _id: req.user.referred_by },
      {
        $inc: { amount_earned: req.body.amount > 500 ? 500 : req.body.amount },
      },
      (err, data) => {
        if (err) return res.json({ error: err });
      }
    );
  }

  User.findOne({ _id: req.user._id }, (err, doc) => {
    if (doc.interest_sum <= 0) {
      doc.interest_sum = Number(req.body.amount);
      doc.interest_date = new Date();
    }
    doc.amount_invested = Number(doc.amount_invested) + Number(req.body.amount);
    doc.save((err, newDoc) => {
      res.json({ data: newDoc });
    });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({});
});

module.exports = router;

/*
time created
100

120

time created - 


*/
