const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
koalaRouter.get('/', (req, res) => {
  const sqlText = `SELECT * FROM koala;`;
  pool.query(sqlText)
    .then(results => {
      console.log('Got the koalas from the database', results);
      res.send(results.rows);
    })
    .catch(error => {
      console.log('Nope go ${sqlText} yourself', error);
      res.send(500);
    })
})

// POST
koalaRouter.post('/', (req, res) => {
  let newKoala = req;
  const sqlTest = `INSERT INTO koala_holla ("name", "age", "gender", "ready_to_transfer", "notes") 
  VALUES($1, $2, $3, $4, $5);`;
  console.log('Got a new koala:', newKoala);
  pool.query(sqlText, [newKoala.name, newKoala.age, newKoala.gender, newKoala.readyForTransfer, koala.notes])
    .then(results => {
      console.log('New koala added', results);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('Ya go make that query yourself', error);
      res.sendStatus(500);
    })
})


// PUT
koala.put('/', (res, res) => {
  

})


// DELETE

module.exports = koalaRouter;