const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand')

module.exports = dotenvExpand(dotenv.config());