const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const { requireAuth } = require("../middleware/authMiddleware");

router.use(requireAuth);

router.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("items.product")
    .sort({ createdAt: -1 });
  res.render("orders/index", { title: "Pedidos", orders });
});

router.post("/:id/status", async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.redirect("/orders");
});

module.exports = router;
