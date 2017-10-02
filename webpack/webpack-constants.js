const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_DIR = path.resolve(ROOT_DIR, 'src');
const BUNDLES_DIR = path.resolve(APP_DIR, 'bundles');
const RESOURCE_PATTERN = /\.(png|jpe?g|gif|svg|ico)%/;

module.exports = {
    ROOT_DIR,
    APP_DIR,
    BUNDLES_DIR,
    RESOURCE_PATTERN
};