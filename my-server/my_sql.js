var mysql = require("mysql");
var util = require("util");
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();

const connection = mysql.createConnection({
  host: "localhost",
  //	host: "ec2-13-124-149-215.ap-northeast-2.compute.amazonaws.com",
  port: "3306",
  user: "root",
  password: "jim1292!",
  database: "new_schema",
});
const query = util.promisify(connection.query).bind(connection);
var my_sql = {};

my_sql.get_data = async function (user_id) {
  let rows = [];
  try {
    rows = await query(`select * from user  where id = ${user_id}`);
    console.log(`Get ${user_id} user's detail from user DB`);
    console.log(rows);
    return rows;
    // connection.end();
    // console.log(rows);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

my_sql.get_all = async function () {
  console.log("Getting all data...");
  let rows = [];
  try {
    rows = await query(`select * from user`);
    console.log("Get all users");
    return rows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

my_sql.create = async function (data) {
  hasher({ password: data.password }, async (error, pw, salt, hash) => {
    if (error) {
      console.log(error);
      return;
    }
    data.password = hash;
    data.salt = salt;
    console.log(data);
    try {
      await connection.query("Insert Into user Set ?", data);
      console.log(`Create new user : ${data.name} in user DB`);
    } catch (e) {}
  });
};

my_sql.update = async function (data) {
  const id = data.id;
  delete data["id"];
  hasher({ password: data.password }, async (error, pw, salt, hash) => {
    if (error) {
      console.log(error);
      return;
    }
    data.password = hash;
    data.salt = salt;
    console.log(data);
    try {
      await connection.query(`Update user SET ? Where id =${id}`, data);
      console.log(`Update ${id} : ${data.name} from user DB`);
      // insert data into example table
    } catch (e) {
      // console.log(e);
    }
  });
};

my_sql.remove = async function (data) {
  const id = data.id;
  try {
    await connection.query(`Delete From user Where id = ${id}`);
    console.log(`Delete ${id} : ${data.name} from user DB`);
    // insert data into example table
  } catch (e) {
    // console.log(e);
  }
};

my_sql.email = async function (email) {
  try {
    console.log(email);
    // const target_user = await connection.query(
    //   `Select name from user Where id = ${email}`
    // );
    console.log(`Get user whoes email is ${email} from user DB`);
    // console.log(target_user);
    const rows = await query(`select * from user  where id = ${email}`);
    console.log(rows);
    return target_user;
  } catch (e) {
    // console.log(e);
  }
};

exports.my_sql = my_sql;
