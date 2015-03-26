+function(undefined) {
    "use strict";

    var mysql = require("mysql");

    var rdate = require("../mock/date")({
        beginYear: 1980,
        endYear: 2015,
        isUTC: false
    });

    function Table(conn) {
        this.connection = conn;
        this.tableName  = "testTable";
    }

    Table.prototype.create = function(_callback) {
        var preStmt = "CREATE TABLE ?? (id INT NOT NULL AUTO_INCREMENT, number VARCHAR(100), cdate VARCHAR(30), PRIMARY KEY ( id ))"
        ,   inserts = [this.tableName]
        ,   sql     = mysql.format(preStmt, inserts);

        console.log(sql);

        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (typeof _callback === "function") {
                _callback();
            }
        });
    };

    Table.prototype.insert = function(num, _callback) {
        num = num || 1;
        var post = [];
        while (num -- > 0) {
            post.push([
                Math.floor((Math.random() * 100000) + 1),
                rdate.generate()
            ]);
        }

        var preStmt = "INSERT INTO ?? (number, cdate) VALUES ?"
        ,   inserts = [this.tableName, post]
        ,   sql     = mysql.format(preStmt, inserts);

        console.log(sql);

        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (typeof _callback === "function") {
                _callback();
            }
        });
    };

    module.exports = function(conn) {
        return new Table(conn);
    }

}();