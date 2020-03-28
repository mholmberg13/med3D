const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");

// recognize controller for Med routes
const medController = require("../controllers/med.js");
router.use("/med3D/med.js", medController);

// recognize controller for Order routes
const ordersController = require("../controllers/orders.js");
router.use("/orders", ordersController);

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// authenticate the user, create new session.
// recognize user role and redirect to the index route that matches the role.
router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
     // determine the user type (Med or Printer), redirect accordingly.
    //  console.log('The session', req);
        res.redirect("/");
    
    //   res.redirect("/app");
    } else {
      
      res.render("sessions/new.ejs");
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;