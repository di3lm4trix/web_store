const dns = require("node:dns");
const consoleColors = require("./ConsoleColors.config");

const configureDns = (origen) => {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  console.log(
    consoleColors.success(
      `> DNS: ${consoleColors.normal("Servidores DNS configurados correctamente desde")} ${consoleColors.reference(origen)}`,
    ),
  );
};

module.exports = configureDns;
