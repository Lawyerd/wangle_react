const localStrategy = require("passport-local").Strategy;

module.exports = passport => {
  passport.use(
    new localStrategy(
      {
        usernameField: "id", // 여기서 id,pw의 값은 index.html의 form에서 해당하는 name값이여야 합니다.
        passwordField: "pw",
      },
      (id, pw, done) => {
        // id, pw는 위에서 받은 값 입니다.

        console.log(id);
      }
    )
  );
};
