var express = require("express");
var router = express.Router();
const { db_post } = require("../my_sql.js");

router.post("/create", create_post);
// router.post("/update/:pageID", update_post);
// router.post("/delete", delete_user);
router.get("/all", get_all_posts);
router.get("/:postID", get_post);

async function create_post(req, res) {
  console.log(req.body);
  await db_post.create(req.body);
  // await mysql.create(req.body);
}

async function get_all_posts(req, res) {
  const selected_post = await db_post.find_all();
  res.send(selected_post);
}

async function get_post(req, res, next) {
  const post_id = req.params.postID;
  const selected_post = await db_post.find_by_id(post_id);
  res.send(selected_post);
  // if (post_id !== "favicon.ico") {
  //   const user = await mysql.get_data(post_id);
  //   if (isEmptyArr(user)) {
  //     res.redirect("/");
  //   } else {
  //     res.send(user);
  //   }
  // }
}

function isEmptyArr(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  }
  return false;
}

module.exports = router;
