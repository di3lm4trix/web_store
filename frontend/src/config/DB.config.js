// importar todo lo necesario
const configureDNS = require("./DNS.config");
const mongoose = require("mongoose");
require("dotenv").config();
const consoleColors = require("./consoleColors.config");

// configura la conexion a la base de datos, necesita de un dns especifico
configureDNS("DATABASE");

// funcion para conectar la base de datos y devolver un objeto de conexion
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      consoleColors.success(
        // es un logger que muestra en la terminal
        `> DATABASE: ${consoleColors.normal("Conexion exitosa")} `,
      ),
    );
  } catch (e) {
    //en caso de error lo muestra en la terminal
    console.log(consoleColors.error(`> DATABASE: ${e}`));
  }
};

// exporta la funcion de usar la base de datos
module.exports = {
  connectDB,
};
