const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
require("dotenv").config();
const consoleColors = require("./consoleColors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(consoleColors.success("> DATABASE: Conexion exitosa"));
  } catch (e) {
    console.log(consoleColors.error(`> DATABASE: ${e}`));
  }
};

connectDB();
