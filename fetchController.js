/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, browser: true */
/*global FetchView*/
/*global FetchModel*/
"use strict";

var fetchView = null, 
    fetchModel = null,
    fetchController = null;

function FetchController() {
    this.init = function () {
        fetchView = new FetchView();
        fetchModel = new FetchModel();
    };
}

fetchController = new FetchController();
window.addEventListener("load", fetchController.init);