import express from "express";  //node modules/express를 찾음
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");//views의 경로 세팅
app.use(logger);
app.use(express.urlencoded({ extended: true}));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);
    
app.use(flash());
app.use(localsMiddleware);
app.use("/", rootRouter);

//  /static주소를 통해 공개
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/favicon", express.static("favicon"));

app.use("/api", apiRouter);
app.use("/videos", videoRouter);  
app.use("/users", userRouter)

export default app;