const express = require("express");
const router = express.Router({mergeParams:true}); // (:id is shows undefine in app.js but we use mergeParamas :id is working)
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


//post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.addReview)
)

//delete review route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))

module.exports = router;