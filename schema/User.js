const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    referred_by: ObjectId,
    interest_sum: { type: Number, default: 0 },
    interest_date: Date,
    amount_earned: { type: Number, default: 0 },
    amount_invested: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
