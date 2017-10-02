Error.stackTraceLimit = Infinity;

const path = require('path');

require('core-js/es6');
require('core-js/es7/reflect');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fask-async-test');

const testsContext = require.context('../src', true, /\.(test|spec).ts/);
testsContext.keys().forEach(testsContext);

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');
const common = require('@angular/common');

testsing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting(),
    common.APP_BASE_HREF
).configureTestingModule({
    providers: [{
        provide: common.APP_BASE_HREF,
        useValue: '/'
    }]
});