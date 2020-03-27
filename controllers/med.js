const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");


const Med = require("../models/users.js");
const Order = require("../models/order.js");

// const seedData = require("../models/seed_appointment.js");

/**
  * INDEX Route - for Med
  * Display all orders placed by this user
  * Query the Order collection by user's unique id.
  */

 router.get("/", (req,res) => {
   
    if (req.session.currentUser) {

        Order.find(
          {requestor_id: req.session.currentUser._id },
          (error, medOrder) => {
            res.send(medOrder);
          }
        )      
        
      } else {
          res.redirect("/sessions/new");
      }
  });


module.exports = router;