var container = require("./my_sql.js");
var mysql = container.my_sql;
var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport"); // passport/index.js
const cors_options = {
  origin: "http://localhost:3000", // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

const app = express(); // app에 application이라는 객체가 담긴다.
app.use(cors(cors_options));
app.use(bodyParser.json());
app.use(
  // 기본적인 세션설정
  session({
    resave: false,
    saveUninitialized: false,
    secret: "pyh",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.get("/", index); // routing --> 사용자가 특정한 path로 들어올 때 길을 안내하는 역할
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig(passport);
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // passport/localStrategy.js를 실행시킵니다.  (1)
    console.log("user");

    console.log(user);
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
      }
    });
  })(req, res, next);

  res.redirect("/success");
});

app.post("/create", create_user);
app.post("/update/:pageID", update_user);
app.post("/delete", delete_user);
app.get("/user/all", pages);

app.get("/user/:pageID", page);

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

async function create_user(req, res) {
  await mysql.create(req.body);
}

async function update_user(req, res) {
  await mysql.update(req.body);
}

async function delete_user(req, res) {
  await mysql.remove(req.body);
}

async function pages(req, res, next) {
  var pages = await mysql.get_all();
  res.send(pages);
}

async function page(req, res, next) {
  const user_id = req.params.pageID;
  console.log(user_id);
  if (user_id !== "favicon.ico") {
    const user = await mysql.get_data(user_id);
    if (isEmptyArr(user)) {
      res.redirect("/");
    } else {
      res.send(user);
    }
  }
}

function isEmptyArr(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  }
  return false;
}
