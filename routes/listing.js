const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn,isOwner,validateListing} = require("../views/middleware.js")
const listingController = require("../controllers/listing.js");

//multer npm i multer
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


//All listing rout
router
  .route("/")
  .get(isLoggedIn, wrapAsync(listingController.index)) // index Route
  .post(isLoggedIn, 
    upload.single("listing[image]"), 
    validateListing, 
    wrapAsync(listingController.createListing)); // Create route

// //index route
// router.get("/" ,isLoggedIn,wrapAsync(listingController.index));
   
//New Route
 router.get("/new",isLoggedIn,listingController.renderNewForm);
     
   
   router
   .route("/:id")
   .get(wrapAsync(  listingController.showListing))//show route
   .put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing,wrapAsync( listingController.updateListing  ))//update route
   .delete(isLoggedIn,isOwner, wrapAsync(   listingController.destroyListing));//delete route

     //Show Route
   //  router.get("/:id",wrapAsync(  listingController.showListing))
    
     //Edit Rout
     router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(  listingController.renderEditForm ));
   
     //Update Route
    //  router.put("/:id",isLoggedIn,isOwner,wrapAsync( listingController.updateListing  ));
   
    //  //Delete Route
    //  router.delete("/:id",isLoggedIn,isOwner, wrapAsync(   listingController.destroyListing));
      module.exports = router;