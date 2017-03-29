/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google */
"use strict";

function Helper() {
    
}

Helper.prototype.getUrlParameter = function (name) {
    var argument_strings = window.location.href.split('?')[1].split('&');
    for (var i = 0; i < argument_strings.length; i++) {
        var argument_split = argument_strings[i].split('=');
        if (argument_split.length > 1 && argument_split[0].replace('#', '') === name) {
            return decodeURIComponent(argument_split[1].replace('#', ''));
        }
    }
    return '';
};


Number.prototype.formatTime = function () {
    var seconds = Math.floor(this / 1000);
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hours * 3600) / 60);
    seconds = seconds % 60;
    var ret_string = '';

    if (hours > 0) {
        if (hours < 10) {
            hours = '0' + hours;
        }
        ret_string += hours + ':';
    }
    if (minutes > 0 || ret_string !== '') {
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        ret_string += minutes + ':';
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    ret_string += seconds;

    if (this > 3600000) {
        ret_string += ' hours';
    } else if (this > 60000) {
        ret_string += ' minutes';
    } else {
        ret_string += ' seconds';
    }
    return ret_string;
};



Helper.prototype.getItemFromLocalStorage = function (item) {
    var value;
    if (Storage === "undefined" || !localStorage.getItem(item)) {
        console.log("no local storage!");
        return '';
    } else {
        console.log("got " + item + " from local storage");
        value = localStorage.getItem(item);
    }
    return value;
};

Helper.prototype.setItemInLocalStorage = function (item, val) {
    if (Storage === "undefined") {
        console.log("no local storage!");
    } else {
        console.log("saved " + item + " to local storage");
        localStorage.setItem(item, val);
    }
};