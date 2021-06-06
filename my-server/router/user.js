var express = require("express");
var router = express.Router();
var container = require("../my_sql.js");
var mysql = container.my_sql;

router.post("/create", create_user);
router.post("/update/:pageID", update_user);
router.post("/delete", delete_user);
router.get("/all", pages);
router.get("/:pageID", page);

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

module.exports = router;
