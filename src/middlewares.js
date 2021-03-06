import multer from "multer";
import multerS3 from "multer-s3";
import aws from  "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
})

const isHeroku = process.env.NODE_ENV == "production";

const s3ImageUploader = multerS3({
    s3:s3,
    bucket: "wetube-verser/avartars/",
    acl: "public-read",
})

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "wetube-verser/videos/",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube"
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.loggedInUser = req.session.user || {};
    // console.log("LOCAL MIDDLEWARE ", req.session.user);
    next();
}
export const testMiddleware = (req, res, next) => {
    // console.log(req.session);
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
    limits: {
        fileSize: 3000000,
    },
    storage: s3ImageUploader,
});

export const videoUpload = multer({
    dest: "uploads/videos",
    limits: {
        fileSize: 100000000,
    },
    storage: s3VideoUploader,
});
