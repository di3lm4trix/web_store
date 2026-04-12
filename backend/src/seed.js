require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/admin.model");
const configureDNS = require("./config/DNS.config");

async function seed() {
  configureDNS("SEED");
  await mongoose.connect(process.env.MONGO_URI);
  await Admin.deleteMany({});

  const admin = new Admin({ username: "admin", password: "admin1234" });
  console.log("Antes de guardar:", admin.password);
  await admin.save();
  console.log("Después de guardar:", admin.password);

  process.exit(0);
}

seed();
