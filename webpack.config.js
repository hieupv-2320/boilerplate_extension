const contentScripts = require('./webpack/content-scripts');
const background = require('./webpack/background');
const popup = require('./webpack/popup');

module.exports = [
    contentScripts,
    background,
    popup,
];