const db = require("../data/db-config");

const find = () => {
  return db("users");
};

const findBy = (data) => {
  return db("users").where(data).first();
};

const add = async (data) => {
  const user = await db("users").insert(data);
  return { id: user[0], username: data.username };
};

module.exports = { find, findBy, add };
