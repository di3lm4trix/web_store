// importar express para usar su enrutador
const express = require("express");
// crear una instancia del enrutador
const router = express.Router();
// importar el modelo de admin
const Admin = require("../models/admin.model");

const consoleColors = require("../config/consoleColors.config");

router.get("/login", (req, res) => {
  if (req.session.admin) return res.redirect("/products");
  res.render("auth/login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Intento de login", { username, password });

  try {
    const admin = await Admin.findOne({ username });

    console.log("Admin encontrado", admin ? "sí" : "no");

    if (!admin || !(await admin.comparePassword(password))) {
      console.log("Credenciales incorrectas");
      return res.render("auth/login", {
        title: "Login",
        error: "Credenciales incorrectas",
      });
    }

    console.log("Login exitoso");
    req.session.admin = { _id: admin._id, username: admin.username };
    res.redirect("/products");
  } catch (e) {
    console.log("Error en login", e);
    res.render("auth/login", { title: "Login", error: "Error del seridor" });
    console.log(
      consoleColors.error(`> SERVER (LOGIN:POST): ${consoleColors.normal(e)}`),
    );
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/auth/login"));
});

module.exports = router;
