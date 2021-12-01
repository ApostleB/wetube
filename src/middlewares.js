export const localsMiddleware = (req, res, next) => {
    console.log(req.session);
    res.locals.siteName = "Wetube"
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.loggedInUser = req.session.user;
    if(req.session.user){
        console.log("!!", req.session.user.email);
    }
    
    next();
}