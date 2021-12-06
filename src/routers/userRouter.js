import express from "express";
import { see, logout,startGithubLogin, finishGithubLogin, postEdit, getEdit } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get(":id", protectorMiddleware, see);
userRouter.get("/logout", logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware) //미들웨어
  .get(protectorMiddleware, getEdit)
  .post(protectorMiddleware, postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

export default userRouter;