import express from "express"
import { join } from "../controllers/userController";
import { trendingVideos } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trendingVideos);
globalRouter.get("/join", join);

export default globalRouter;