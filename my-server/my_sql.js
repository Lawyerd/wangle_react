import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jim1292",
  database: "new_schema",
});
const query = util.promisify(connection.query).bind(connection);

export async function get_data(id) {
  let rows = [];
  try {
    rows = await query(`select * from user  where id = ${id}`);
    // connection.end();
    // console.log(rows);
  } catch (err) {
    console.log(err);
  }
  return rows;
}

export async function get_all() {
  let rows = [];
  try {
    rows = await query(`select * from user`);
  } catch (err) {
    console.log(err);
  }
  return rows;
}

export async function create(data) {
  console.log(data.name);
  try {
    // insert data into example table
    await connection.query("INSERT INTO user SET ?", data);
  } catch (e) {
    // console.log(e);
  }
}

export async function update(data) {
  console.log(data);
  const id = data.id;
  delete data["id"];
  try {
    await connection.query(`Update user SET ? Where id =${id}`, data);

    // insert data into example table
  } catch (e) {
    // console.log(e);
  }
}
