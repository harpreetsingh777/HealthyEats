let express = require('express');
let router = express.Router();
let mysqlLib = require("../mySqlLib");

/* GET users listing. */
router.get('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let query = "SELECT * FROM Users";

        connection.query(query, function (err, result) {
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
});

/* GET user with username. */
router.get('/:username', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let query = "SELECT * FROM Users WHERE username = \"" + req.params.username + "\"";

        connection.query(query, function (err, result) {
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
});

/* POST user. */
router.post('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = req.body.username;
        let password = req.body.password;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;

        let query = "INSERT INTO Users VALUES " +
            "(\"" + username + "\", " +
            "\"" + password + "\", " +
            "\"" + first_name + "\", " +
            "\"" + last_name + "\")";


        connection.query(query, function (err, result) {
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
});

/* DELETE user. */
router.delete('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = req.body.username;

        let query = "DELETE FROM Users WHERE username = " +
            "\"" + username + "\"";


        connection.query(query, function (err, result) {
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
});

function sendError(res, errorMessage, errorNumber) {
    res.status(errorNumber).send({
        message: errorMessage,
        data: []
    });
}

module.exports = router;