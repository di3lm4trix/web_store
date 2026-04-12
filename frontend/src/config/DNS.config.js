// importar los modulos de dns
const dns = require("node:dns");
const consoleColors = require("./consoleColors.config");

// crear una funcion que define la conexion de dns para usarlo en las conexiones a la base de datos
const configureDns = (origen) => {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  console.log(
    consoleColors.success(
      `> DNS: ${consoleColors.normal("Servidores DNS configurados correctamente desde")} ${consoleColors.reference(origen)}`,
    ),
  );
};

// exportar el modulo
module.exports = configureDns;
