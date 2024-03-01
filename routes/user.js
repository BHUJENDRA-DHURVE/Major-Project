const express = require("express");
const router = express.Router({mergeParams:true});

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../views/middleware.js");
const userController = require("../controllers/users.js");

//signup
router
.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signUp));


//logging in
router
.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl,
passport.authenticate("local",
{failureRedirect:'/login',
failureFlash:true}), userController.login);


//logging out
router.get("/logout",userController.logout);

module.exports = router;