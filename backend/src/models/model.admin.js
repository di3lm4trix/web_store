const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// crear el esquema de tendran todos los users en la db
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// middleware que se ejecuta antes de guardar en la db
adminSchema.pre("save", async function (next) {
  // si se modifico el nombre del admin, evita que se vuelva a hashear la contrasena
  if (!this.modifiedPaths("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// metodo perzonalizado para comparar la contrasena que recibimos con la que hay en la db
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
