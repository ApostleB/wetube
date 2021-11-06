import express from "express";  //node modules/express를 찾음
import morgan from "morgan";
const PORT = 4000;
const app = express();

const logger = morgan("dev");

const handleHome = (req, res) => {
    return res.send("send middlewares");
} 
const handleLogin = (req, res) => {
    return res.send({ message: "Login Here" })
}
const handleProtected = (req, res) => {
    return res.send("welcome to the private lounge");
}

app.use(logger);

app.get("/", handleHome);
app.get("/login", handleLogin);  
app.get("/protected", handleProtected)

const handleListening = () => 
console.log("Server Listenting on port http://localhost:4000")

app.listen(PORT, handleListening)