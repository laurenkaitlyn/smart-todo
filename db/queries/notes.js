const db = require('../connection');

// Get all notes belonging to the current user
const getAllByUserId = function(userId) {
  const query = `
		SELECT *
  	FROM notes
  	WHERE notes.user_id = $1
  	ORDER BY notes.created_at ASC`;

  const value = [userId];

  return db
    .query(query, value)
    .then(res => res.rows)
    .catch(err => err.message);
};

//get notes belonging to current user by category
// const getUserNotesByCategory = function(userId, category) {
//   const query = `
//   SELECT *
//   FROM notes
//   WHERE notes.user_id = $1 AND category_id = $2
//   ORDER BY notes.created_at ASC
//   `;

//   const values = [userId, category]

//   return db
//     .query(query, values)
//     .then(res => res.rows)
//     .catch(err => err.message)

// };

//insert new note into notes db
const newUserNote = function(userId, content, category) {
  const date = new Date();
  const query = `
		INSERT INTO notes (user_id, category, content, created_at)
  	VALUES ($1, $2, $3, $4)
  	RETURNING *;`;

  const values = [userId, category, content, date];

  return db
    .query(query, values)
    .then(res => res.rows[0])
    .catch(err => err.message);
};

// Update notes's values in database
const updateNotes = function(userId, category, content, completed, noteId) {
  let query = `UPDATE notes SET`;
  const queryParams = [];

  //if the user wants to swicth the category
  if (category) {
    queryParams.push(category);
    query += ` category = $${queryParams.length}`;
  }

  //if the user wants to change the todo content
  if (content) {
    queryParams.push(content);
    query += `, content = $${queryParams.length}`;
  }

  // user has finished the specific task
  if (completed) {
    queryParams.push(completed);
    query += ` completed = $${queryParams.length},`;
  }

  queryParams.push(userId);
  query += ` WHERE user_id = $${queryParams.length}`;
  queryParams.push(noteId);
  query += ` AND id = $${queryParams.length} RETURNING *;`;

  return db
    .query(query, queryParams)
    .then(res => res.rows[0])
    .catch(err => err.message);
};



// Delete specified task from database
const deleteNote = function(userId, noteId) {
  let query = `DELETE FROM notes WHERE user_id = $1 AND id = $2`;

  const values = [userId, noteId];

  return db
    .query(query, values)
    .then(res => res.rows[0])
    .catch(err => err.message);
};




module.exports = { getAllByUserId, getUserNotesByCategory, newUserNote, updateNotes, deleteNote }
