const db = require('../connection');
const { query } = require("express");

//get user
const getUsers = () => {
  return db
  .query('SELECT * FROM users;')
  .then(data => data.rows)
  .catch(err => err.message);
};

//add new user
const newUser = (user) => {
  const query = `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *`

  const values = (user.name, user.email, user.passsword);

  return db
  .query(query, values)
  .then(res => res.rows[0])
  .catch(err => err.message)
}

module.exports = { getUsers, newUser };
