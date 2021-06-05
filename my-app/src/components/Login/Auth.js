import axios from "axios";
import base_url from "../../data/base_url.js";

export function signIn({ email, password }) {
  const update_data = async ({ email, password }) => {
    console.log(email);
    await axios({
      method: "post",
      url: base_url + `/login`,
      data: email,
    });
  };
  update_data({ email, password });
  // throw new Error();
  // if (user === undefined) throw new Error();
  // return user;
}
