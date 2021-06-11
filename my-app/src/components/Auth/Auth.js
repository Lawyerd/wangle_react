import axios from "axios";
import base_url from "../../data/base_url.js";

export async function signIn({ email, password }) {
  let login_user = {};
  await axios({
    method: "post",
    url: base_url + `/auth/local`,
    data: { email: email, password: password },
  })
    .then(function (response) {
      const user = response.data;
      console.log("response user");
      if (user === "") {
        throw new Error("no user!");
      } else {
        console.log("no Error");
        login_user = user;
      }
    })
    .catch(function (error) {
      console.log("error");
      console.log(error);
      throw new Error();
    });

  // throw new Error();
  // if (user === undefined) throw new Error();
  // return user;
  return login_user;
}
