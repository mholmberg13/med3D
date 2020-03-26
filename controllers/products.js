const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");

const Product = require("../models/product.js");
const seedData = require("../models/seed_product.js");


/**
  * SEED ROUTE - push items into the database for testing
  */
 router.get("/med3d/seed/products", (req,res) => {
    
    Product.insertMany(seedData, (err, products) => {
        if (err) { 
            console.log(`Error Seeding the Database: ${err}`);
        } else {
            console.log("Added appointment data provided", products);
            console.log(products);
            
        }
        
        res.send("Product Seeding Executed!");
    });
});

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