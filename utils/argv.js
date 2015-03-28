+function(undefined) {
    "use strict";

    var program = require("commander");

    function collect(arr, defaultVal) {
        if (Array.isArray(arr) &&
            arr.length > 0) {
            defaultVal = [];
            for (var i = 0; i < arr.length; i ++) {
                var obj = arr[i];
                if (typeof obj === "Object") {

                } else if (typeof obj === "String") {
                    
                }

            }
        }
        console.log("arr", arr);
        return defaultVal;
    }

    program
        .version("1.0.1")
        .option("-h, --host <host>", "Specify host", "localhost")
        .option("-u, --user <user>", "Specify user", "root")
        .option("-p, --password <password>", "Specify password", "Lxh_6589775")
        .option("-d, --db <db>", "Specify which database to use", "test")
        .option("-t, --table <table>", "Specify table name", "testTable")
        .option("-c, --columns [columns]", "Specify columns", collect, ["num", "date"]);

    program.on("--help", function(){
        console.log("  Examples:");
        console.log("");
        console.log("    $ node index -h localhost -u root -p ****** -d testDB -t testTable");
        console.log("    $ node index --host localhost --user root --password ****** --db testDB --table testTable");
        console.log("");
    });

    module.exports = function(argv) {
        program.parse(argv);

        return program;
    };
}();