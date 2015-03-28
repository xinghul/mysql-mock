+function(undefined) {
    "use strict";

    var mysql = require("mysql");

    var args = require("./utils/argv")(process.argv);

    console.log(args);

    var connection = mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "Lxh_6589775",
        database : "test"
    })
    ,   table      = require("./utils/table")(connection);

    function processRow(row, _callback) {
        console.log(row);
        _callback();
    }
    // table.insert(10000, closeConnection);

    // pool.getConnection(function (err, connection) {
    //     if (err) {
    //         console.error("error connecting:", err.stack);
    //         return;
    //     }

    //     console.log("connected as id", connection.threadId);

    //     var query = connection.query('SELECT * FROM user');
    //     query
    //     .on("error", function(err) {
    //         // Handle error, an 'end' event will be emitted after this as well
    //     })
    //     .on("fields", function(fields) {
    //         // the field packets for the rows to follow
    //     })
    //     .on("result", function(row) {
    //         // Pausing the connnection is useful if your processing involves I/O
    //         connection.pause();

    //         processRow(row, function() {
    //             connection.resume();
    //         });
    //     })
    //     .on("end", function() {
    //         closePool();
    //     });
    // });

    function closeConnection() {
        console.log("close connection");
        connection.destroy();
    }

    // function closePool() {
    //     pool.end(function (err) {
    //         if (err) {
    //             console.error("error closing pool:", err.stack);
    //             return;
    //         }
    //         console.log("close pool");
    //     });
    // }
}();