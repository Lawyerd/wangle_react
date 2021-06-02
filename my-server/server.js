var container = require("./my_sql.js");
var mysql = container.my_sql;

var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");

const app = express(); // app에 application이라는 객체가 담긴다.

const options = {
  origin: "http://localhost:3000", // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

app.use(cors(options));
app.use(cors());
app.use(bodyParser.json());
app.get("/", index); // routing --> 사용자가 특정한 path로 들어올 때 길을 안내하는 역할

app.post("/create", create_user);
app.post("/update/:pageID", update_user);
app.post("/delete", delete_user);

app.get("/pages", pages);

app.get("/:pageID", page);

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
  console.log(mysql);

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
  console.log("page");
  const user = await mysql.get_data(user_id);
  if (isEmptyArr(user)) {
    res.redirect("/");
  } else {
    res.send(user);
  }
}

function isEmptyArr(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  }
  return false;
}
