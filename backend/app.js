// para correr el servidor
const express = require("express");
// para los directorios
const path = require("path");
// para los modelos de datos
const mongoose = require("mongoose");
// para mantener las sesiones
const session = require("express-session");
// conectar a la db mongo
const { MongoStore } = require("connect-mongo");
// conectar a los enrutadores de las funciones
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/products.routes");
const orderRoutes = require("./src/routes/orders.routes");
const categoriesRoutes = require("./src/routes/categories.routes");
// conectar a la base de datos
const { connectDB } = require("./src/config/DB.config");

// definir a express como motor del server
const app = express();

// conectar a la base de datos
connectDB().catch((err) => console.error("Error conectando a la DB:", err));

// configurar motor de plantillas
app.set("view engine", "pug");
// configurar rutas predefinidas
app.set("views", path.join(__dirname, "src/views"));

// predefinir archivos estaticos
app.use(express.static(path.join(__dirname, "src/public")));

// parsear los formularios
app.use(express.urlencoded({ extended: true }));

// configurar las sesiones
app.use(
  session({
    // las claves para firmar las sesiones
    secret: process.env.SESSION_SECRET || "iceberg-secreto",
    // solo guarda en la db si hubo cambios
    resave: false,
    // para que no se guarde una sesion sin datos
    saveUninitialized: false,
    // conectar a la db remota
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    // configurar la cookie que se envia al navegador
    cookie: {
      // la cookie solo la puede leer el navegador, no desde js
      httpOnly: true,
      //   tiempo de vida de la cookie
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// hacer user disponible en todos los templates de pug
app.use((req, res, next) => {
  res.locals.admin = req.session.admin || null;
  next();
});

// rutas que tienen que responder
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoriesRoutes);

// redirigir la raiz a products
app.get("/", (req, res) => res.redirect("/products"));

// si no se encuentra el endpoint devuelve 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Página no encontrada" });
});

// iniciar el server
const PORT = process.env.PORT || 3001;
connectDB()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`🐧 Admin panel corriendo en http://localhost:${PORT}`),
    ),
  )
  .catch((err) => console.error("Error al conectar la DB:", err));
