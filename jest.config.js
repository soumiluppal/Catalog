
const { defaults } = require('jest-config');

module.exports = {
    verbose: true,
    "transform": {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.svg$": "jest-svg-transformer",
        "^.+\\.css$": "jest-transform-css",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-file",
    }
};