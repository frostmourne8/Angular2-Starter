module.exports = {

    basePath: '',

    frameworks: ['jasmine'],

    files: [
        { pattern: 'karma-entry.js', watched: false },
        { pattern: '../src/images/**/*', included: false, served: true, watched: false }
    ],

    proxies: {
        '/images/': '/base/src/images/'
    },

    preprocessors: {
        'karma-entry.js': ['webpack', 'sourcemap']
    },

    webpackMiddleware: { stats: 'errors-only', noInfo: true, watchOptions: { poll: true }},

    port: 9876,
    colors: true
}
