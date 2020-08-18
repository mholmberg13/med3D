const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");

const Order = require("../models/order.js");
const User = require("../models/users.js");
const { db } = require("../models/order.js");
let dpa = 0;

/**
 * EDIT  - Displays page where we can edit an order for 
 * the Med currently logged in.
 */

router.get("/:id/edit", (req, res) => {
  if (req.session.currentUser) {
      res.send("Med.js Controller - PLACEHOLDER for Order EDIT routing");
  } else {
      res.redirect("/sessions/new");
  }
});

/**
 * UPDATE - PUT revised order data into the database
 */

 router.put("/:id", (req, res) => {
   Order.findByIdAndUpdate(
     req.params.id,
     req.body,
     {new: true},
     (err, updateOrder) => {
      //  res.redirect(`/orders/${req.params.id}`);
      res.send(updateOrder);
     }
   )
 })


/** 
   * CREATE - Store new order in the database
   * const orderSchema = new mongoose.Schema({
    requestor_id:  { type: String, required: true },
    requestor_name: { type: String, required: true },
    product_id:  { type: String, required: true },
    product_name: { type: String, required: true },
    quantity: {type: Number, required: true },
    status: { type: String, required: true},
    fulfilled_by: {type: Array}
}, {timestamps: true});
   */
  router.post("/", (req, res) => {
    // Pull the Med's name and id from currentUser object
    // default the order status to new
    // before saving in the database.

      req.body.requestor_id = req.session.currentUser._id;
      req.body.requestor_name = req.session.currentUser.username;
      req.body.status = "new";
      
      Order.create(req.body, (error, result) => {
        res.send("Order.js Controller - Created Record in DB");
      });
      db.collection("users").find({}).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        db.close();
      })

  });

  /**
   * Med - Create New Order routing
   * Redirects to form that captures new order data.
   */
  router.get("/new", (req, res) => {
    if (req.session.currentUser) {
        res.render("new_order.ejs");
        // res.render("../views/appointment/new.ejs",
        // {creator: req.body.creator,
        //     username: req.session.currentUser.username
        // });
    } else {
        res.redirect("/sessions/new");
    }
  });

  /**
   * SHOW route - Display details of a single order
   */

   router.get("/:id", (req, res) => {
       Order.findById(req.params.id, (err, foundOrder) => {
           res.send(foundOrder);
       })
   });

   /** DELETE Route - Remove Order from the database */
   router.delete("/:id", (req, res) => {
     if (req.session.currentUser) {
       Order.findByIdAndRemove(
         req.params.id,
         (err, orderData) => {
           res.send(`Order.js - Deleted ${req.params.id}`);
         }
       )
     } else {
       res.redirect("/sessions/new");
     }
   })
module.exports = router;