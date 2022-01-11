//import 관리
//server의 configuration에 관련된 코드만 처리하기 위한 파일

//env파일 사용을 위한
import "regenerator-runtime";   //build후 await async error로 인해 추가
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";
const PORT = 3000;

const handleListening = () =>
  console.log(`Server Listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
