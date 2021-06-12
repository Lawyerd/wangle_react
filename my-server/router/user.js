var express = require("express");
var router = express.Router();
const { db_user } = require("../my_sql.js");

router.post("/create", create_user);
router.post("/update/:pageID", update_user);
router.post("/delete", delete_user);
router.get("/all", pages);
router.get("/:pageID", page);

async function create_user(req, res) {
  await db_user.create(req.body);
}

async function update_user(req, res) {
  await db_user.update(req.body);
}

async function delete_user(req, res) {
  await db_user.remove(req.body);
}

async function pages(req, res, next) {
  var pages = await db_user.get_all();
  res.send(pages);
}

async function page(req, res, next) {
  const user_id = req.params.pageID;
  console.log(user_id);
  if (user_id !== "favicon.ico") {
    const user = await db_user.find_by_id(user_id);
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
