+function(undefined) {
    "use strict";

    var rdate = require("./mock/date")({
        beginYear: 1980,
        endYear: 2015,
        isUTC: false
    });

    // function daysInMonth(year, month) {
    //     return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    // }

    // for (var i = 0; i < 12; i ++) {
    //     console.log(daysInMonth(1980, i));
    // }

    console.log(rdate.generate());
}();