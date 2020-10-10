if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const db = require("./config/db");
const giveInterest = require("./config/giveInterest");
const initializePassport = require("./config/passport");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

initializePassport(passport);
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.static("build"));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/", routes);
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

db.once("open", () => {
  console.clear();
  setInterval(giveInterest, 1e3); // check to give interest per second;
  console.log(`Database connected successfully`);
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
