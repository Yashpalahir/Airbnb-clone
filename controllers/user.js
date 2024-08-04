const User = require("../models/user");

module.exports.signup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signupNew = async (req,res)=>{                //[why used saveRedirectUrl?Because when user is registered successfully
    try{                                                          //and login automatic at that time req.sesssion that gives 
        let {username,email,password} = req.body;                 // empty string value so we must save in req.locals.]
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}

module.exports.login =(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginNew = async (req,res)=>{
    req.flash("success","Welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    })
}