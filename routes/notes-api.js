/*
 * All routes for notes Data are defined here
 * Since this file is loaded in server.js into api/notes,
 *   these routes are mounted onto /api/notes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const notesQueries = require('../db/queries/notes');
const sort = require('../sort-notes-into-categories');
//CRUD api notes

//Create - new post from user and sort into catgory
router.post('/', (req,res) => {
  const userId = req.query.user_id;
  const content = req.body.content;

  sort.simpleCheck(content)
  .then(res => notesQueries.newUserNote(userId, content, res))
  .then(note => {
    res.json({ note });
  })
  .catch(err => err.message);

})


//Read All by user_id
router.get('/', (req, res) => {
  const userId = req.query.user_id;
  if (!userId) {
    res.status(401).send('🚫Unauthorized Request. Please Login🚫');
    return;
  }

  notesQueries.getAllByUserId(userId)
    .then(notes => {
      res.json({ notes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Update - post
router.put('/:user_id/edit', (req, res) => {
  const userId = req.query.user_id;
  const category = req.body.category;
  const content = req.body.content;
  const noteId = req.params.noteId;

  notesQueries.updateNotes(userId, category, content, noteId)
    .then(note => {
      res.json({ note })
    })
    .catch(err => err.message);
})


//delete- post
router.post('/:id/delete', (req, res) => {
  const userId = req.query.user_id;
  const notesId = req.query.notesId

  notesQueries.deleteNote(userId, notesId)
    .then(note => {
      res.json({ note })
    })
    .catch(err => err.message)

})

module.exports = router;
