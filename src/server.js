import express from "express";  //node modules/express를 찾음
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware, testMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");//views의 경로 세팅
app.use(logger);
app.use(express.urlencoded({ extended: true}));

//varnilla js에서 post fetch를 할때 body를 못받아와서 미들웨어 추가 해줘야 함

// const uri = "mongodb+srv://verser:qf9138qf@cluster0.z941d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    // store: MongoStore.create({ mongoUrl: uri }),
  })
);
app.use(testMiddleware);
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