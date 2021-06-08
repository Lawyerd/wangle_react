var express = require("express");
var router = express.Router();
const passport = require("passport");

router.post("/local", function (req, res, next) {
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

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.send(res);
    res.redirect("http://localhost:3000/");
    // console.log(res);
    // console.log(res.body);
  }
);

module.exports = router;
