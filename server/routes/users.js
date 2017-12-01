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

function sendError(res, errorMessage, errorNumber) {
    res.status(errorNumber).send({
        message: errorMessage,
        data: []
    });
}

module.exports = router;