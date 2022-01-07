import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube"
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.loggedInUser = req.session.user || {};
    // console.log("LOCAL MIDDLEWARE ", req.session.user);
    next();
}

//
export const protectorMiddleware = (req, res, next) => {
    //사용자가 로그인이 되어있으면
    
    if(req.session.loggedIn){
        return next();
    }else{
        req.flash("error", "Login first");
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    //사용자가 로그인이 안되어있으면
    if(!req.session.loggedIn){
        return next();
    }else{
        req.flash("error", "Not authorized");
        return res.redirect("/");
    }
}

export const avatarUpload = multer({
    dest: "uploads/avartars/",
    limits:{
        fileSize: 3000000,
    }
});

export const videoUpload = multer({
    dest:"uploads/videos",
    limits:{
        fileSize: 100000000,
    }
})