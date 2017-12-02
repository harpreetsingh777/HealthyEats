let express = require('express');
let router = express.Router();
let mysqlLib = require("../mySqlLib");

/* GET users listing. */
router.get('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let query = "SELECT * FROM Recipes LIMIT 50";

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

/* GET single recipe listing. */
router.get('/:recipe_name', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let recipe_name = req.params.recipe_name;
        let query = "SELECT * FROM Recipes WHERE recipe_name " +
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

/* GET ingredients listing. */
router.get('/ingredients', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let query = "SELECT * FROM Ingredients";

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

/* GET ingredients listing for a certain recipe. */
router.get('/ingredients/:recipe_name', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let recipe_name = req.params.recipe_name;
        let query = "SELECT * FROM Ingredients WHERE recipe_name = \"" + recipe_name + "\"";

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

/* POST recipe. */
router.post('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let recipe_name = req.body.recipe_name;
        let image_url = req.body.image_url;
        let calories = req.body.calories;
        let total_weight = req.body.total_weight;

        let query = "INSERT INTO Recipes VALUES " +
            "(\"" + recipe_name + "\", " +
            "\"" + image_url + "\", " +
            calories + ", " +
            total_weight + ")";


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

/* POST recipe ingredients. */
router.post('/ingredients', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let recipe_name = req.body.recipe_name;
        let ingredient_name = req.body.ingredient_name;

        let query = "INSERT INTO Ingredients VALUES " +
            "(\"" + recipe_name + "\", " +
            "\"" + ingredient_name + "\")";


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

/* DELETE recipe. */
router.delete('/', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let recipe_name = req.body.recipe_name;
        let query = "DELETE FROM Recipes WHERE recipe_name = \"" + recipe_name + "\"";

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

/* DELETE ingredient. */
router.delete('/ingredients', function(req, res, next) {
    mysqlLib.getConnection(function(err, connection) {
        let recipe_name = req.body.recipe_name;
        let ingredient_name = req.body.ingredient_name;
        let query = "DELETE FROM Ingredients WHERE recipe_name = " +
            "\"" + recipe_name + "\"" +
            " AND ingredient_name = " +
            "\"" + ingredient_name + "\"";

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