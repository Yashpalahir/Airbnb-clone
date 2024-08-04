const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.get("/signup",userController.signup)

router.post("/signup",wrapAsync(userController.signupNew)
)

router.get("/login",userController.login)

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.loginNew
)

router.get("/logout",userController.logout);


module.exports = router;