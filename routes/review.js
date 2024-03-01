const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../views/middleware.js")
const {validateReview,isReviewOwner} =require("../views/middleware.js")

const reviewController = require("../controllers/reviews.js");

  
  // Add Review Route
  router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReviews));
  
  //Delete Review Route
  router.delete("/:reviewId",isLoggedIn,isReviewOwner,
  wrapAsync(reviewController.destroyReviews));
  

  module.exports = router;
  