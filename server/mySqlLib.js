let mysql = require('mysql');

let pool = mysql.createPool({
    host: "fa17-cs411-05.cs.illinois.edu",
    user: "root",
    password: "db_sqlites",
    port: 3306,
    database: "HealthyEats"
});

exports.getConnection = function(callback) {
    pool.getConnection(function(err, conn) {
        if(err) {
            return callback(err);
        }
        callback(err, conn);
    });
};