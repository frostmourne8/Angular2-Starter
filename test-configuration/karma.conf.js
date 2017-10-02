'use strict';

const _ = require('lodash');
const KARMA_BASE = require('./karma-base');
const WebpackTest = require('../webpack/webpack.test');

module.exports = (config) => {
    config.set(_.extend(KARMA_BASE, {
        
        browsers: ['chrome_with_debugging'],

        customLaunchers: {
            chrome_with_debugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9222']
            }
        },

        webpack: WebpackTest,

        reporters: ['progress'],

        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false
    }));
}