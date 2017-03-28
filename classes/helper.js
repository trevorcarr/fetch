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
            return argument_split[1].replace('#', '');
        }
    }
    return '';
};