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

// Get gender
router.get('/gender/:username', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.params.username);

        let query = "SELECT gender from Users WHERE username=" + username;

        connection.query(query, function (err, result) {
            if (err) {
                sendError(res, err.message, 500);
            } else {
                res.status(200).send({
                    message: 'Not OK',
                    data: result
                });
            }
        });
    });
});

// Get age range
router.get('/age_range/:username', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.params.username);

        let query = "SELECT age_range from Users WHERE username=" + username;

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

// Get activity level
router.get('/activity_level/:username', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.params.username);

        let query = "SELECT activity_level from Users WHERE username=" + username;

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
router.put('/gender', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.body.username);
        let gender = connection.escape(req.body.gender);

        let query = "UPDATE Users SET gender=" + gender + " WHERE username=" + username;

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

// Put age range
router.put('/age_range', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.body.username);
        let ageRange = connection.escape(req.body.age_range);

        let query = "UPDATE Users SET age_range=" + ageRange + " WHERE username=" + username;

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

// Put activity level
router.put('/activity_level', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.body.username);
        let activityLevel = connection.escape(req.body.activity_level);

        let query = "UPDATE Users SET activity_level=" + activityLevel + " WHERE username=" + username;

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