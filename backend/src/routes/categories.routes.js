const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const { requireAuth } = require("../middleware/authMiddleware");
const consoleColors = require("../config/consoleColors.config");

// se configura el middleware, cada peticion a esta ruta pasara por aqui
router.use(requireAuth);

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.render("categories/index", { title: "Categorias", categories });
});

router.get("/new", (req, res) => {
  res.render("categories/form", { title: "Nueva Categoria", category: null });
});

router.post("/", async (req, res) => {
  try {
    await Category.create(req.body);
    res.redirect("/categories");
  } catch (e) {
    res.render("categories/form", {
      title: "Nueva Categoria",
      category: null,
      error: "Error al crear la categoria",
    });

    console.log(
      consoleColors.error(
        `> SERVER (CATEGORIES:POST): ${consoleColors.normal(e)}`,
      ),
    );
  }
});

router.get("/:id/edit", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.redirect("/categories");
  res.render("categories/form", { title: "Editat Categoria", category });
});

router.post("/:id", async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/categories");
});

router.post("/:id/delete", async (req, res) => {
  const count = await Product.countDocuments({ category: req.params.id });
  if (count > 0) {
    const categories = await Category.find();
    return res.render("categories/index", {
      title: "Categorias",
      categories,
      error: `No se puede eliminar esta categoria, tiene ${count} producto(s) asociado(s)`,
    });
  }
  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/categories");
});

module.exports = router;
