require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectDB } = require("./src/config/DB.config");

const storeRoutes = require("./src/routes/store.routes");
const orderRoutes = require("./src/routes/orders.routes");

const app = express();

connectDB();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src.views"));

app.use(express.static(path.join(__dirname, "src/public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", storeRoutes);
app.use("/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Pagina no encontrada" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`TIENDA CORRIENDO EN http://localhost:${PORT}`);
});
