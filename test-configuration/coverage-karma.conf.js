'use strict';

const _ = require('lodash');
const path = require('path');
const KARMA_BASE = require('./karma-base');
const WebpackCoverage = require('../webpack/webpack-coverage');

module.exports = (config) => {
    config.set(_.extend(KARMA_BASE, {

        browsers: ['PhantomJS'],
        phantomJsLauncher: {
            exitOnResourceError: true
        },

        preprocessors: {
            'karma-entry.js': ['webpack', 'sourcemap']
        },

        webpack: WebpackCoverage,

        coverageReporter: { type: 'in-memory' },

        coverageIstanbulReporter: {
            reports: ['html', 'json', 'lcov', 'text-summary'],
            dir: path.join(__dirname, '..', 'coverage', 'ui'),
            fixWebpackSourcePaths: true,
            'report-config': {
                html: { subdir: 'html' }
            },
            thresholds: {
                emitWarning: false,
                global: {
                    statements: 90,
                    lines: 90,
                    branches: 90,
                    functions: 90
                }
            }
        },

        reporters: ['progress', 'coverage-istanbul'],
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true
    }));
}