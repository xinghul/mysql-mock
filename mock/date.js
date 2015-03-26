+function(undefined) {
    "use strict";

    var moment = require("moment");

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function RandomDate(beginYear, duration, isUTC) {
        this.beginYear = beginYear;
        this.duration  = duration;
        this.isUTC     = isUTC;
    }

    RandomDate.prototype.generate = function() {
        var year  = Math.floor(Math.random() * this.duration + this.beginYear)
        ,   month = Math.floor(Math.random() * 12)
        ,   day   = Math.floor(Math.random() * daysInMonth(year, month))
        ,   timeObj = {
            y : year,
            M : month,
            d : day,
            h : Math.floor(Math.random() * 24),
            m : Math.floor(Math.random() * 60),
            s : Math.floor(Math.random() * 60),
            ms: Math.floor(Math.random() * 1000),
        };
        if (this.isUTC) {
            return moment.utc(timeObj).format();
        } 
        return moment(timeObj).format();
    };

    module.exports = function(options) {
        var beginYear = options.beginYear || 1980
        ,   endYear   = options.endYear || 2015
        ,   isUTC     = options.isUTC === true ? true : false;
        return new RandomDate(beginYear, endYear - beginYear + 1, isUTC);
    };

}();