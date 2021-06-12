const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { db_user } = require("../my_sql.js");
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();
var isEmptyArr = require("../util/isEmtyArr");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => {
    // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(
    new LocalStrategy(
      {
        // local 전략을 세움
        usernameField: "email",
        passwordField: "password",
        session: true, // 세션에 저장 여부
        passReqToCallback: false,
      },
      async (email, password, done) => {
        const user = await db_user.find_by_email(email);
        console.log(user);
        if (!isEmptyArr(user)) {
          console.log(user[0]);
          hasher(
            { password: password, salt: user[0].salt },
            (error, password, salt, hash) => {
              if (hash === user[0].password) {
                const sanitize_user = {
                  id: user[0].id,
                  authority: user[0].authority,
                  name: user[0].name,
                  email: user[0].email,
                };
                return done(null, sanitize_user); // 검증 성공
              }
              return done(null, false, { message: "비밀번호가 틀렸습니다" });
            }
          );
        } else {
          return done(null, false, { message: "존재하지 않는 아이디입니다" }); // 임의 에러 처리
        }
      }
    )
  );
};
