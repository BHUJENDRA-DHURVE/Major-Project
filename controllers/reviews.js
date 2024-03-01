const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReviews = async (req, res) => {
    let listingId = req.params.id;
    let newReviewData = req.body.review;
  
    // Create a new review object
    let newReview = new Review({
      comment: newReviewData.comment,
      rating: newReviewData.rating,
      author: req.user._id, // Set the author field to the current user's ID
    });
  
    // Save the new review
    await newReview.save();
  
    // Find the listing by ID
    let listing = await Listing.findById(listingId);
  
    // Associate the review with the listing
    listing.reviews.push(newReview._id);
  
    // Save the updated listing
    await listing.save();
  
    console.log("New review saved");
    req.flash("success","New Review Added");
    res.redirect(`/listings/${listingId}`);
  }

  module.exports.destroyReviews = async(req,res)=>{
    let{id,reviewId}= req.params;
    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
   
  }