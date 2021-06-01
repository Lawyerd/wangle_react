import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jim1292",
  database: "new_schema",
});
const query = util.promisify(connection.query).bind(connection);

export async function get_data(user_id) {
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
}

export async function get_all() {
  let rows = [];
  try {
    rows = await query(`select * from user`);
    console.log("Get all users");
    return rows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function create(data) {
  try {
    // insert data into example table
    await connection.query("INSERT INTO user SET ?", data);
    console.log(`Create new user : ${data.name} from user DB`);
  } catch (e) {
    // console.log(e);
  }
}

export async function update(data) {
  const id = data.id;
  delete data["id"];
  try {
    await connection.query(`Update user SET ? Where id =${id}`, data);
    console.log(`Update ${id} : ${data.name} from user DB`);
    // insert data into example table
  } catch (e) {
    // console.log(e);
  }
}

export async function remove(data) {
  const id = data.id;
  try {
    await connection.query(`Delete From user Where id = ${id}`);
    console.log(`Delete ${id} : ${data.name} from user DB`);
    // insert data into example table
  } catch (e) {
    // console.log(e);
  }
}
