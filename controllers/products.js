const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");

const Product = require("../models/product.js");
const seedData = require("../models/seed_product.js");



/**
 * CREATE - Store new product in the database
 * name, description, quantity
 */

router.post("/", (req, res) => {

    Product.create(req.body, (error, result) =>{
        
        res.redirect("/app");
        
    })
})



module.exports = router;