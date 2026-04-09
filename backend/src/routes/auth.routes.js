// importar express para usar su enrutador
const express = require("express");
// crear una instancia del enrutador
const router = express.Router();
// importar el modelo de admin
const Admin = require("../models/admin.model");

const consoleColors = require("../config/consoleColors");

router.get("login", (req, res) => {
  if (!req.session.admin) return res.redirect("/products");
  res.render("auth/login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin || !(await admin.comparePassword(password))) {
      return (
        res.render("auth/login"),
        {
          title: "Login",
          error: "Credenciales incorrectas",
        }
      );
    }
  } catch (e) {
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
