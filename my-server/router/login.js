var express = require("express");
var router = express.Router();
const passport = require("passport");
const axios = require("axios");
const REST_API_KEY = "c6252e6cd654811488e77d0e1dcfb696";
const LOGOUT_REDIRECT_URI = "http://localhost:3000/";
const APP_ADMIN_KEY = "d1c5e406fa8041fc0d45a2597e9a1457";

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
  async (req, res) => {
    // res.send(res);
    // console.log(req.user);
    console.log("*****************");
    // console.log(req.user);
    console.log(req.session);
    console.log(req.session.passport.user.accessToken);
    req.session = null;
    res.cookie("kakao_user", req.user, { httpOnly: false });
    // res.send(req.user);

    res.redirect("http://localhost:3000/oauth");
  }
);

router.post("/kakao_logout", kakao_logout);

router.post("/kakao_unlinked", kakao_unlinked);

async function kakao_logout(req, res) {
  console.log("kakao_logout");
  try {
    await axios({
      method: "get",
      url: `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`,
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.session);
  console.log("logout!");
}

async function kakao_unlinked(req, res) {
  const formUrlEncoded = x =>
    Object.keys(x).reduce(
      (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
      ""
    );
  console.log(req.body.user.id);
  try {
    axios.post(
      "https://kapi.kakao.com/v1/user/unlink?",
      formUrlEncoded({
        target_id: `${req.body.user.id}`,
        target_id_type: "user_id",
      }),
      {
        headers: {
          "content-Type": "application/x-www-form-urlencoded",
          Authorization: `KakaoAK ${APP_ADMIN_KEY}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  console.log(`${req.body.user.id} is unlinked`);
}

module.exports = router;
