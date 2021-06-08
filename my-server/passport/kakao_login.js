const passport = require("passport");
var KakaoStrategy = require("passport-kakao").Strategy;
module.exports = () => {
  passport.use(
    "kakao",
    new KakaoStrategy(
      {
        clientID: "c6252e6cd654811488e77d0e1dcfb696",
        callbackURL: "http://localhost:9000/auth/kakao/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        //console.log(profile);
        console.log(profile);
        console.log("good get");
        return done(null, "user");
      }
    )
  );
};
