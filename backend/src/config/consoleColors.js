const chalk = require("chalk");

const error = chalk.bold.red;
const success = chalk.green;
const warning = chalk.keyword("orange").italic;

module.exports = {
  error,
  success,
  warning,
};
