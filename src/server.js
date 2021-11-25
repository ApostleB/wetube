import express from "express";  //node modules/express를 찾음
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");//views의 경로 세팅

//middleware
app.use(logger);
app.use(express.urlencoded({ extended: true}));
//ROUTERS
app.use("/", globalRouter);
app.use("/videos", videoRouter);  
app.use("/users", userRouter)
console.log(process.cwd() + "/src/views");

export default app;