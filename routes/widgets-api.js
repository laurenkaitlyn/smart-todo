/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

// CRUD
// CREATE POST
router.post('/', (req,res) => {
  const {user_id} = req.session;
  let {content} = req.body;
  content = content.toLowerCase();
  let values = [user_id, category_id, content];
  let category_id = 6;
  if (content.includes('read')) category_id =1;
  if (content.includes('buy')) category_id =2;
  if (content.includes('watch')) category_id =3;
  if (content.includes('leisure')) category_id =4;
  if (content.includes('home')) category_id =5;
  if (content.includes('other')) category_id =6;
  const query = 'INSERT INTO notes (user_id, category_id, content) VALUES ( $1, $2, $3);';

  if (user_id) {
    db.query(query, values)
    .then(data => {
      const notes = data.rows;
      res.json({ notes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
})

// READ All
router.get('/', (req, res) => {
  const {user_id} = req.session;
  const query = `SELECT user_id, content, categories.name AS name FROM notes
                JOIN categories ON category_id = categories.id
                WHERE user_id = $1`;
  //const {user_id} = req.query;
  if (user_id) {
    db.query(query, user_id)
    .then(data => {
      const notes = data.rows;
      res.json({ notes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
  console.log(query);

});

// READ One
router.get('/notes/:id', (req, res) => {
  const {user_id} = req.session;
  const query = `SELECT * notes
                WHERE user_id = $1, category_id = $2`;

  if (user_id) {
    db.query(query, user_id)
    .then(data => {
      const notes = data.rows;
      res.json({ notes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
  console.log(query);

});

// UPDATE GET

router.get('/notes/:id/edit', (req, res) => {
  const {user_id} = req.session;
  const query = `SELECT * notes
                WHERE id = $1`;

  if (user_id) {
    db.query(query, user_id)
    .then(data => {
      const notes = data.rows;
      res.json({ notes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
  console.log(query);

});

// UPDATE POST

router.post('/:id/edit', (req, res) => {
  const {user_id} = req.session;
  const query = `UPDATE notes SET category_id = $1`;

  if (user_id) {
    db.query(query, category_id)
    .then(data => {
      const notes = data.rows;
      res.json({ notes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
  console.log(query);

});

//DELETE POST

router.post('/:id/edit', (req, res) => {
  const {user_id} = req.session;
  const query = `DELETE FROM notes WHERE id = $1`;

  if (user_id) {
    db.query(query, id)
    .then(data => {
      const notes = data.rows;
      res.json({ notes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
  console.log(query);

});


module.exports = router;
