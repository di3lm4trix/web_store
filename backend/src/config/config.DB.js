const configureDNS = require("./config.DNS");
const mongoose = require("mongoose");
require("dotenv").config();
const consoleColors = require("./config.ConsoleColors");

configureDNS("DATABASE");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      consoleColors.success(
        `> DATABASE: ${consoleColors.normal("Conexion exitosa")} `,
      ),
    );
  } catch (e) {
    console.log(consoleColors.error(`> DATABASE: ${e}`));
  }
};

module.exports = {
  connectDB,
};
