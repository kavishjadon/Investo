const User = require("../schema/User");

function giveInterest() {
  User.find().exec((err, docs) => {
    if (err) console.log(err);
    docs.forEach((doc) => {
      if (doc.interest_date) {
        let time = new Date();
        let timeDiff = time - doc.interest_date;
        let minutes = Math.floor(timeDiff / 60e3);
        if (minutes >= 1) {
          let earnings = 0.02 * doc.interest_sum * minutes;
          earnings = Math.floor(earnings * 100) / 100;
          doc.amount_earned += earnings;
          doc.interest_sum = doc.amount_invested;
          doc.interest_date = time;
          doc.save();
        }
      }
    });
  });
}

module.exports = giveInterest;
