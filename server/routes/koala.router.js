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

  console.log('******************************************************************************************************************************************************************************************************************************************************************************************************************');
  
  let newKoala = req.body;
  console.log(newKoala);
  console.log(newKoala.name);
  const sqlText = `INSERT INTO koala ("name", "gender", "age", "ready_to_transfer", "notes") 
  VALUES($1, $2, $3, $4, $5) RETURNING id;`;
  console.log('Got a new koala:', newKoala);
  pool.query(sqlText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
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
koalaRouter.put('/:id', (req, res) => {
  
  console.log('A koala is ready to transfer');
  const koalaToTransfer = req.params.id;
  const queryText = `UPDATE koala_holla SET ready_to_transfer='true' WHERE it=$1;`;
  pool.query(queryTest, [koalaToTransfer])
    .then( result => {
      console.log('A koala is ready to transfer', result);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('So... I don\'t feel like marking any koalas as ready to transfer rn', error);
      res.sendStatus(500);      
    })
})


// DELETE

module.exports = koalaRouter;