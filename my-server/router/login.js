var express = require("express");
var router = express.Router();
const passport = require("passport");
const axios = require("axios");

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
    failureRedirect: "http://localhost:3000/",
  }),
  (req, res) => {
    // res.send(res);
    console.log(req.user);
    console.log("*****************");
    // console.log(req.user);
    // console.log(req.session);
    res.cookie("kakao_user", req.user, { httpOnly: false });
    // res.send(req.user);
    res.redirect("http://localhost:3000/oauth");
  }
);

module.exports = router;
