let express = require('express');
let router = express.Router();
let mysqlLib = require("../mySqlLib");

/* GET searches for a specific user. */
router.get('/:username', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.params.username);

        let query = "SELECT search_item FROM SearchRecords WHERE username=" + username;

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

/* POST searches for a specific user. */
router.post('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.body.username);
        let searchItem = connection.escape(req.body.search_item);

        let query =
            "INSERT INTO SearchRecords VALUES(" + username + ", " + searchItem + ")";

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