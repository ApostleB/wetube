export const localsMiddleware = (req, res, next) => {
    console.log(req.session);
    res.locals.siteName = "Wetube"
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.loggedInUser = req.session.user || {};
    if(req.session.user){
        console.log("!!", req.session.user.email);
    }
    
    next();
}

//
export const protectorMiddleware = (req, res, next) => {
    //사용자가 로그인이 되어있으면
    
    if(req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    //사용자가 로그인이 안되어있으면
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/");
    }
}