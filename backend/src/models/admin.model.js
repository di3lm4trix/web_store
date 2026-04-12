// importar todo lo necesario
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const configureDNS = require("../config/DNS.config");

configureDNS("ADMIN MODEL");
// crear el esquema de tendran todos los users en la db
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// middleware que se ejecuta antes de guardar en la db
// async sin next — Mongoose usa la Promise directamente
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// metodo perzonalizado para comparar la contrasena que recibimos con la que hay en la db
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
