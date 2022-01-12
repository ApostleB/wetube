/*
1. mongodb연결
2. windows mongoDB설치
3. 시스템 환경변수 세팅 ~~~/bin
4. npm i mongoose // mongoose설치
5. 아래 코드 대로 실행
6. 노마드버젼으로는 파일 임포트까지 시키면 경고문이 떠서 
useNewUrlParser, useUnifiedTopology를 사용한다고 하는데
노마드 버젼은 4.대 현재사용 버젼은 5.대로 다른것 같음

*/
import mongoose from "mongoose";

// mongoose.connect(process.env.DB_URL);
// // mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useFindAndModify:false,
// //     useCreateIndex: true,
// // });

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});





const db = mongoose.connection
db.on("error", (err) => console.log("☣️🚫DB Error", err));  //db.on은 여러번 발생 가능

//db.once는 오로지 한번만 발생하는 이벤트
db.once("open", () => console.log("✔️ Connect to DB!!👌"));   