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
  
  
  
  
  /**
   * Controllers
   */
  
  const usersController = require("./controllers/users.js");
  app.use("/users", usersController);
  
  const sessionsController = require("./controllers/sessions.js");
  app.use("/sessions", sessionsController);
  
  
  
  /**
   * Public Sources
   */
  app.use(express.static('public'));
  
  
    
 
    app.get("/", (req, res) => {
      res.render("index.ejs", {
        currentUser: req.session.currentUser
      });
    });
  
  
   /**
    * LISTENER
    */
  
   app.listen(process.env.PORT, () => {
      console.log("Server Up and Listening");
  });