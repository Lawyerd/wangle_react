var express = require("express");
var router = express.Router();
const passport = require("passport");

router.post("/", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    if (user) {
      console.log("Success");
      var json = JSON.parse(JSON.stringify(user));
      res.send(json);
    } else {
      // 로그인 실패
      console.log("login fail");
      res.send(err);
    }
  })(req, res);
});

module.exports = router;
