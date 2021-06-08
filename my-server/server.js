var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport"); // passport/index.js
const kakaoConfig = require("./passport/kakao_login"); // passport/index.js

var login_router = require("./router/login");
var user_router = require("./router/user");
const cors_options = {
  origin: "http://localhost:3000", // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

const app = express(); // app에 application이라는 객체가 담긴다.
app.use(cors(cors_options));
app.use(bodyParser.json());
app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
); // 세션 활성화
app.get("/", index); // routing --> 사용자가 특정한 path로 들어올 때 길을 안내하는 역할
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig();
kakaoConfig();

app.use("/auth", login_router);
app.use("/user", user_router);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.listen(9000, () => {
  // listen이라는 method가 실행될 때, 웹 서버가 실행되면서 3000번 port에 listening하게 되고, listening에 성공하면 콜백함수가 실행된다.
  console.log(`Example app listening at http://localhost:9000`);
});

async function index(req, res) {
  res.send("Main");
}
