import express from "express";  //node modules/express를 찾음
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 3000;
const app = express();
const logger = morgan("dev");

app.use(logger);

//ROUTERS
app.use("/", globalRouter);
app.use("/videos", videoRouter);  
app.use("/users", userRouter)

const handleListening = () => 
console.log(`Server Listenting on port http://localhost:${PORT}`)

app.listen(PORT, handleListening)