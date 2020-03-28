const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");

const Order = require("../models/order.js");

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
      })
  })

module.exports = router;