let express = require('express');
let router = express.Router();
let mysqlLib = require("../mySqlLib");

/* GET favorites listing. */
router.get('/:username', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = req.params.username;

        let preparedStatment = "SELECT * FROM (SELECT U.username, R.recipe_name, R.image_url, " +
            "R.calories, R.total_weight" +
            " FROM Users U, Favorites F, Recipes R WHERE " +
            "F.username = U.username AND " +
            "F.recipe_name = R.recipe_name AND " +
            "F.image_url = R.image_url) A WHERE " +
            "A.username = ?";
        let values = [username];

        connection.query(preparedStatment, values, function (err, result) {
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

/* GET favorites listing for the search param. */
router.get('/:username/:recipe_name', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = req.params.username;
        let recipe_name = req.params.recipe_name;

        let query = "SELECT * FROM (SELECT U.username, R.recipe_name, R.image_url, " +
            "R.calories, R.total_weight" +
            " FROM Users U, Favorites F, Recipes R WHERE " +
            "F.username = U.username AND " +
            "F.recipe_name = R.recipe_name AND " +
            "F.image_url = R.image_url) A WHERE " +
            "A.username = \"" + username + "\" AND A.recipe_name " +
            "LIKE \"%" + recipe_name + "%\" LIMIT 50";

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

/* POST Favorite recipe. */
router.post('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.body.username);
        let recipe_name = connection.escape(req.body.recipe_name);
        let image_url = connection.escape(req.body.image_url);

        let query = "INSERT INTO Favorites VALUES " +
            "(" + username + ", " + recipe_name + ", " + image_url + ")";

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

/* DELETE Favorite recipe. */
router.delete('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.body.username);
        let recipe_name = connection.escape(req.body.recipe_name);
        let image_url = connection.escape(req.body.image_url);

        let query = "DELETE FROM Favorites WHERE " +
            "username = " + username +
            " AND recipe_name = " + recipe_name +
            " AND image_url = " + image_url;

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