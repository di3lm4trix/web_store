const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    adress: { type: String, required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendiente", "enviado", "entregado"],
      default: "pendiente",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
