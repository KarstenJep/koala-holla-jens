const pg = require('pg');

const config = {
  database: 'koala_holla',//koala
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('Postgresql connected! Dope w00t!!!');  
})

pool.on('error', error => {
  console.log('Postgresql didn\'t feel like connecting right now', error);
});

module.exports = pool