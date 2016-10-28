'use strict';

var webpackConfig = require('../webpack/webpack.test');

module.exports = (config) => {
    config.set({
        
        basePath: '',

        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

        phantomJsLauncher: {
            exitOnResourceError: true
        },

        files: [
            {pattern: 'karma.entry.js', watched: false}
        ],

        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: { stats: 'errors-only', noInfo: true },

        webpackServer: { noInfo: true },

        reporters: ['progress', 'clear-screen'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false
    });
}