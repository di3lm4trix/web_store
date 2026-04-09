const chalk = require("chalk");

const error = chalk.bold.red;
const success = chalk.green;
const normal = chalk.white;
const reference = chalk.keyword("blue");
const warning = chalk.keyword("orange").italic;

module.exports = {
  error,
  normal,
  success,
  reference,
  warning,
};
