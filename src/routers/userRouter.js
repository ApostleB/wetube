import express from "express";
import { userHome, see, logout,startGithubLogin, finishGithubLogin, postEdit, getEdit, getChangePassword, postChangePassword } from "../controllers/userController";
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter
.route("/edit")
.all(protectorMiddleware) //미들웨어
.get(getEdit)
//req.file을 만들어준다
.post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter
.route("/change-password")
.all(protectorMiddleware)
.get(getChangePassword)
.post(postChangePassword);
userRouter.get("/:id", protectorMiddleware, see);

export default userRouter;