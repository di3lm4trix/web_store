// se importa la biblioteca para darle colores a la terminal
const chalk = require("chalk");

// los colores predefinidos
const error = chalk.bold.red;
const success = chalk.green;
const normal = chalk.white;
const reference = chalk.keyword("blue");
const warning = chalk.keyword("orange").italic;

// exportar los colores
module.exports = {
  error,
  normal,
  success,
  reference,
  warning,
};
