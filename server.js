/**
 * Project Name:  Med 3d
 * Technologies: node.js, express, mongoose, ejs
 */

 /**
  * Basic elements.
  */

  // ensure our app looks at the .env file

  require("dotenv").config();
  const express = require('express');
  const mongoose = require('mongoose');
  const methodOverride = require("method-override");
  const session = require("express-session");
  const moment = require("moment-timezone");
  
  
  
  
 
  
  const app = express();
  
  
  // I want moment to be visible across all the controllers
  
  app.locals.moment = moment;
  
  /**
   * Our port - pulled from our .env file
   */
  
  
  /** MIDDLEWARE */
  
  // enables us to read from the request payload
  app.use(express.urlencoded({extended:true}));
  
  // enables UPDATE and DELETE routes
  app.use(methodOverride("_method"));
  
  // enables session management
  app.use(
      session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
      })
    );
  
    
  /** Database connectivity */
  

    mongoose.connect(process.env.MONGODB_URI, {     
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  mongoose.connection.once('open', ()=> {
      console.log('connected to mongo');
  });
  
  
  /**
   * Models
   */
  
  const Product = require("./models/product.js");
const seedData = require("./models/seed_product.js");

const Order = require("./models/order.js");
const orderSeedData = require("./models/seed_order.js");
  
  
  /**
   * Controllers
   */
  
  const usersController = require("./controllers/users.js");
  app.use("/users", usersController);
  
  const sessionsController = require("./controllers/sessions.js");
  app.use("/sessions", sessionsController);
  
  const productsController = require("./controllers/products.js");
  app.use("/med3d", productsController);

  const ordersController = require("./controllers/orders.js");
  app.use("/orders", ordersController);
  
  
  /**
   * Public Sources
   */
  app.use(express.static('public'));
  
    
  app.get("/", (req, res) => {
    console.log(req.session);
    if(req.session.currentUser) {
        Order.find(
          {requestor_id: req.session.currentUser._id},
          (err, foundOrders) => {
            res.render("index.ejs", {
                currentUser: req.session.currentUser,  
                orders: foundOrders
            })
            
        })
        
    } else {
        res.render('index.ejs', {
        currentUser: req.session.currentUser
        });
    }
  });
  

  /**
  * SEED ROUTE - push products into the database for testing
  */
 app.get("/med3d/seed/products", (req,res) => {
    
  Product.insertMany(seedData, (err, products) => {
      if (err) { 
          console.log(`Error Seeding the Database: ${err}`);
      } else {
          console.log("Added product data provided", products);
          console.log(products);
          
      }
      
      res.send("Product Seeding Executed!");
  });
});

/** SEED Route for Orders
 * push orders into the database for testing.
 */

 app.get("/med3d/seed/orders", (req, res) => {
   Order.insertMany(orderSeedData, (err,orders) => {
     if (err) {
       console.log("Error Seeding Order Data", err);
     } else {
       console.log("Added Order data provided", orders);
     }

     res.send("Order Seeding Executed");
   })
 })
  
   /**
    * LISTENER
    */
  
   app.listen(process.env.PORT, () => {
      console.log("Server Up and Listening");
  });