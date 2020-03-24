const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");


// const Appointment = require("../models/appointment.js");
// const seedData = require("../models/seed_appointment.js");

/**
  * INDEX Route - for Med
  */

 router.get("/", (req,res) => {
    if (req.session.currentUser) {
        res.send("GOT TO THE MED INDEX ROUTE");
                } else {
                    res.redirect("/sessions/new");
                }
  });


module.exports = router;