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
router.get('/user/:username', function(req, res, next) {
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

        let query = "INSERT INTO Users(username, password, first_name, last_name) VALUES " +
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

// Put gender
router.put('/settings', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.body.username);
        let gender = connection.escape(req.body.gender);
        let ageRange = connection.escape(req.body.age_range);
        let activityLevel = connection.escape(req.body.activity_level);

        let query = "UPDATE Users SET gender=" + gender +
            ", age_range=" + ageRange +
            ", activity_level=" + activityLevel +
            " WHERE username=" + username;

        connection.query(query, function (err, result) {
            if (err) {
                sendError(res, err.message, 500);
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: gender
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