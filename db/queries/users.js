const db = require('../connection');
const { query } = require("express");

//get user
const getUsers = () => {
  return db
  .query('SELECT * FROM users;')
  .then(data => data.rows)
  .catch(err => err.message);
};

//add new
//in users view page we are using only email and password, name is not part, we removed or change the view
const register = (newUser) => {
  const query = `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *`

  const values = [user.name, user.email, user.passsword];

  return db
  .query(query, values)
  .then(res => res.rows[0])
  .catch(err => err.message)
}

//login user
const login = (user) => {
  const query = 'SELECT * FROM users WHERE name = $1;';
  const values = [user.name, user.email, user.passsword]
  return db
    .query(query, values)
    .then((data) => data.rows[0]);
}

module.exports = { getUsers, register };
