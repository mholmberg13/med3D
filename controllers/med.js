const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");


const Med = require("../models/users.js");
const Order = require("../models/order.js");

// // recognize controller for Order routes
// const ordersController = require("../controllers/orders.js");
// router.use("/med3D/med/orders", ordersController);

/**
 * EDIT  - Displays page where we can edit an order for 
 * the Med currently logged in.
 */

router.get("/orders/:id/edit", (req, res) => {
  if (req.session.currentUser) {
      res.send("Med.js Controller - PLACEHOLDER for Order EDIT routing");
  } else {
      res.redirect("/sessions/new");
  }
});


/**
  * INDEX Route - for Med
  * Display all orders placed by this user
  * Query the Order collection by user's unique id.
  */

 router.get("/", (req,res) => {
   console.log(req);
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