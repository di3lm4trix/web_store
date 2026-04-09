const chalk = require('chalk');

console.log(chalk.green('¡Éxito!'));
console.log(chalk.red.bold('Error grave'));
console.log(chalk.bgBlue.white(' Texto con fondo azul '));

// También puedes crear tus propios temas
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

console.log(error('¡Error!'));
console.log(warning('Cuidado...'));
