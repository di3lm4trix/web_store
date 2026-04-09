const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const { requireAuth } = require("../middleware/authMiddleware");
const consoleColors = require("../config/consoleColors");

// se configura el middleware, cada peticion a esta ruta pasara por aqui
router.use(requireAuth);

router.get("/", async (req, res) => {
  const products = (await Product.find().populate("category")).sort({
    createdAt: -1,
  });
  res.render("products/index", { title: "Productos", products });
});

router.get("/new", async (req, res) => {
  const categories = (await Category.find()).toSorted({ name: 1 });
  res.render("products/form", {
    title: "Nuevo Producto",
    product: null,
    categories,
  });
});

router.post("/", async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect("/products");
  } catch (e) {
    const categories = (await Category.find()).toSorted({ name: 1 });
    res.render("products/form", {
      title: "Nuevo Producto",
      product: null,
      categories,
      error: "Error al crear el producto",
    });
  }
});

router.get("/:id/edit", async (req, res) => {
  const [product, categories] = await Promise.all([
    Product.findById(req.params.id).populate("category"),
    Category.find().sort({ name: 1 }),
  ]);
  if (!product) return res.redirect("/products");
  res.render("products/form", {
    title: "Editar Producto",
    product,
    categories,
  });
});

router.post("/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/products");
  } catch (e) {
    res.redirect("/products");
  }
});

router.post("/:id/delete", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

module.exports = router;
