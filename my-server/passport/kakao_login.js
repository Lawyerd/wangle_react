const passport = require("passport");
var KakaoStrategy = require("passport-kakao").Strategy;
const { db_user } = require("../my_sql.js");
var isEmptyArr = require("../util/isEmtyArr");

module.exports = () => {
  passport.use(
    "kakao",
    new KakaoStrategy(
      {
        clientID: "c6252e6cd654811488e77d0e1dcfb696",
        callbackURL: "http://localhost:9000/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const profile_email = profile._json.kakao_account.email;
        const user = await db_user.find_by_email(profile_email);
        // console.log(user);
        if (!isEmptyArr(user)) {
          const sanitize_user = {
            id: user[0].id,
            authority: user[0].authority,
            name: user[0].name,
            email: user[0].email,
            accessToken: accessToken,
          };
          return done(null, sanitize_user); // 검증 성공
          // console.log(user[0]);
          // hasher(
          //   { password: password, salt: user[0].salt },
          //   (error, password, salt, hash) => {
          //     if (hash === user[0].password) {
          //       const sanitize_user = {
          //         id: user[0].id,
          //         authority: user[0].authority,
          //         name: user[0].name,
          //         email: user[0].email,
          //       };
          //       return done(null, sanitize_user); // 검증 성공
          //     }
          //     return done(null, false, { message: "비밀번호가 틀렸습니다" });
          //   }
          // );
        } else {
          const new_user = {
            id: profile._json.id,
            name: profile._json.properties.nickname,
            nickname: "kakao_user",
            profile_image: profile._json.properties.profile_image,
            email: profile._json.kakao_account.email,
            gender: profile._json.kakao_account.gender,
            country: "Korea",
            authority: "user_kakao",
          };
          console.log(new_user);
          await db_user.create(new_user);
          const sanitize_user = {
            id: new_user.id,
            authority: new_user.authority,
            name: new_user.name,
            email: new_user.email,
            accessToken: accessToken,
          };
          return done(null, sanitize_user); // 임의 에러 처리
        }

        return done(null, profile._json);
      }
    )
  );
};
