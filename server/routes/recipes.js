var express = require('express');
var router = express.Router();

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "fa17-cs411-05.cs.illinois.edu",
    user: "root",
    password: "db_sqlites",
    port: 3306,
    database: "HealthyEats"
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

/* GET recipes listing. */
router.get('/', function(req, res, next) {
  let query = "SELECT * FROM recipes";

  connection.query(query, function (err, result, fields) {
      if (err) {
          sendError(res, err.message, 500);
      } else {
          res.status(200).send({
              message: 'OK',
              data: result
          });
      }
  });
});

function sendError(res, errorMessage, errorNumber) {
    res.status(errorNumber).send({
        message: errorMessage,
        data: []
    });
}

module.exports = router;