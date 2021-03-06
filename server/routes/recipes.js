let express = require('express');
let router = express.Router();
let mysqlLib = require("../mySqlLib");

/* GET users listing. */
router.get('/', function(req, res) {
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
router.get('/:recipe_name', function(req, res) {
    mysqlLib.getConnection(function(err, connection) {
        let recipe_name = connection.escape(req.params.recipe_name);
        let query = "CALL SearchRecipes(" + recipe_name + ")";

        connection.query(query, function (err, result) {
            if (err) {
                sendError(res, err.message, 500);
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: result[0]
                });
            }
        });
    });
});

/* GET ingredients listing. */
router.get('/ingredients/all', function(req, res) {
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
router.get('/ingredients/:recipe_name', function(req, res) {
    mysqlLib.getConnection(function(err, connection) {
        let recipe_name = connection.escape(req.params.recipe_name);
        let query = "SELECT * FROM Ingredients WHERE recipe_name = " + recipe_name;

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

/* GET suggestions. */
// if (no setting and no search):result from suggested_view
// if (no setting but searches): result from searches
// if (settings but no searches): result based on calories (calculated using settings)
// if (settings and searches): result based on calories as well as searches
router.get('/suggestions/:username', function(req, res) {
    mysqlLib.getConnection(function(err, connection) {
        let username = connection.escape(req.params.username);

        // FIRST MAKE A QUERY TO GET THE USER
        let userQuery = "SELECT * FROM Users WHERE username=" + username;

        connection.query(userQuery, function (err, result) {
            if (err) {
                sendError(res, err.message, 500);
            } else {
                let user = result[0];
                let gender = connection.escape(user.gender);
                let ageRange = connection.escape(user.age_range);
                let activityLevel = connection.escape(user.activity_level);

                if (user.gender === null || user.ageRange === null
                    || user.activityLevel === null) {
                    suggestGeneralRecipes(connection, res, username);
                } else {
                    suggestSpecificRecipes1(connection, res,
                        gender, ageRange, activityLevel, username);
                }
            }
        });
    });
});

function suggestGeneralRecipes(connection, res, username) {
    let recentlySearchedItemsQuery =
        "SELECT search_item FROM SearchRecords WHERE username=" + username;

    connection.query(recentlySearchedItemsQuery, function (err, result) {
        if (err) {
            sendError(res, err.message, 500);
        } else {
            let suggestedRecipesQuery;

            if (result.length === 0) {
                suggestedRecipesQuery = "SELECT * FROM SuggestedView LIMIT 50";
            } else {
                suggestedRecipesQuery = "SELECT * FROM Recipes " +
                    "WHERE (recipe_name LIKE '%";

                let searchItemsArray = [];
                for (let i = 0; i < result.length; i++) {
                    let searchItem = result[i];

                    searchItemsArray.push(searchItem.search_item);
                }

                suggestedRecipesQuery += searchItemsArray.join("%' OR recipe_name LIKE '%");
                suggestedRecipesQuery += "%') LIMIT 50";
            }

            connection.query(suggestedRecipesQuery, function (err, result) {
                if (err) {
                    sendError(res, err.message, 500);
                } else {
                    res.status(200).send({
                        message: 'OK',
                        data: result
                    });
                }
            });
        }
    });
}

function suggestSpecificRecipes1(connection, res, gender, ageRange, activityLevel, username) {
    let caloriesQuery = "SELECT calories FROM CaloriesFinder WHERE " +
        "gender=" + gender + " AND " +
        "age_range=" + ageRange + " AND " +
        "activity_level=" + activityLevel;

    connection.query(caloriesQuery, function (err, result) {
        if (err) {
            sendError(res, err.message, 500);
        } else {
            let calories = result[0].calories;
            let minCalorieRange = calories - 200;
            let maxCalorieRange = calories + 200;

            suggestSpecificRecipes2(connection, res, username,
                minCalorieRange, maxCalorieRange);
        }
    });
}

function suggestSpecificRecipes2(connection, res, username,
                                 minCalorieRange, maxCalorieRange) {
    let recentlySearchedItemsQuery =
        "SELECT search_item FROM SearchRecords WHERE username=" + username;

    connection.query(recentlySearchedItemsQuery, function (err, result) {
        if (err) {
            sendError(res, err.message, 500);
        } else {
            let suggestedRecipesQuery;

            if (result.length === 0) {
                suggestedRecipesQuery = "SELECT * FROM Recipes " +
                    "WHERE calories > " + minCalorieRange +
                    " AND calories < " + maxCalorieRange + " LIMIT 50";
            } else {
                suggestedRecipesQuery = "SELECT * FROM Recipes " +
                    "WHERE calories > " + minCalorieRange +
                    " AND calories < " + maxCalorieRange +
                    " AND (recipe_name LIKE '%";

                let searchItemsArray = [];
                for (let i = 0; i < result.length; i++) {
                    let searchItem = result[i];

                    searchItemsArray.push(searchItem.search_item);
                }

                suggestedRecipesQuery += searchItemsArray.join("%' OR recipe_name LIKE '%");
                suggestedRecipesQuery += "%') LIMIT 50";
            }

            connection.query(suggestedRecipesQuery, function (err, result) {
                if (err) {
                    sendError(res, err.message, 500);
                } else {
                    res.status(200).send({
                        message: 'OK',
                        data: result
                    });
                }
            });
        }
    });


    // let suggestedRecipesQuery = "SELECT * FROM Recipes " +
    //     "WHERE calories > " + minCalorieRange +
    //     " AND calories < " + maxCalorieRange +
    //     " LIMIT 50";
    //
    // connection.query(suggestedRecipesQuery, function (err, result) {
    //     if (err) {
    //         sendError(res, err.message, 500);
    //     } else {
    //         res.status(200).send({
    //             message: 'OK',
    //             data: result
    //         });
    //     }
    // });
}

// /* POST recipe. */
// router.post('/', function(req, res, next) {
//     mysqlLib.getConnection(function(err, connection) {
//         let recipe_name = req.body.recipe_name;
//         let image_url = req.body.image_url;
//         let calories = req.body.calories;
//         let total_weight = req.body.total_weight;
//
//         let query = "INSERT INTO Recipes VALUES " +
//             "(\"" + recipe_name + "\", " +
//             "\"" + image_url + "\", " +
//             calories + ", " +
//             total_weight + ")";
//
//
//         connection.query(query, function (err, result) {
//             if (err) {
//                 sendError(res, err.message, 500);
//             } else {
//                 res.status(200).send({
//                     message: 'OK',
//                     data: result
//                 });
//             }
//         });
//     });
// });
//
// /* POST recipe ingredients. */
// router.post('/ingredients', function(req, res, next) {
//     mysqlLib.getConnection(function(err, connection) {
//         let recipe_name = req.body.recipe_name;
//         let ingredient_name = req.body.ingredient_name;
//
//         let query = "INSERT INTO Ingredients VALUES " +
//             "(\"" + recipe_name + "\", " +
//             "\"" + ingredient_name + "\")";
//
//
//         connection.query(query, function (err, result) {
//             if (err) {
//                 sendError(res, err.message, 500);
//             } else {
//                 res.status(200).send({
//                     message: 'OK',
//                     data: result
//                 });
//             }
//         });
//     });
// });
//
// /* DELETE recipe. */
// router.delete('/', function(req, res, next) {
//     mysqlLib.getConnection(function(err, connection) {
//         let recipe_name = connection.escape(req.body.recipe_name);
//         let query = "DELETE FROM Recipes WHERE recipe_name = " + recipe_name;
//
//         connection.query(query, function (err, result) {
//             if (err) {
//                 sendError(res, err.message, 500);
//             } else {
//                 res.status(200).send({
//                     message: 'OK',
//                     data: result
//                 });
//             }
//         });
//     });
// });
//
// /* DELETE ingredient. */
// router.delete('/ingredients', function(req, res, next) {
//     mysqlLib.getConnection(function(err, connection) {
//         let recipe_name = req.body.recipe_name;
//         let ingredient_name = req.body.ingredient_name;
//         let query = "DELETE FROM Ingredients WHERE recipe_name = " +
//             "\"" + recipe_name + "\"" +
//             " AND ingredient_name = " +
//             "\"" + ingredient_name + "\"";
//
//         connection.query(query, function (err, result) {
//             if (err) {
//                 sendError(res, err.message, 500);
//             } else {
//                 res.status(200).send({
//                     message: 'OK',
//                     data: result
//                 });
//             }
//         });
//     });
// });

function sendError(res, errorMessage, errorNumber) {
    res.status(errorNumber).send({
        message: errorMessage,
        data: []
    });
}

module.exports = router;