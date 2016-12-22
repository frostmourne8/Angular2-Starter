"use strict";

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const publicPath = path.resolve(__dirname, '..', 'public');

function ContentRouter() {

    this.apply = apply;

    function apply(app) {        
        app.use(favicon(path.resolve(publicPath, 'images', 'favicon.ico')));        
        app.use(express.static(publicPath));

        app.use('/', createRouter());
    }

    function createRouter() {
        var router = express.Router();

        router.get('/', function(req, res) {
            res.sendFile(path.resolve(publicPath, 'index.html'));
        });

        return router;
    }
}

module.exports = new ContentRouter();