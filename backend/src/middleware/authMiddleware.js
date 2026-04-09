// verifica lo que envia el navegador como credenciales para dar acceso a las rutas protegidas
const requireAuth = (req, res, next) => {
  // si la sesion no es admin, redirige al login
  if (!req.session.admin) return res.redirect("/auth/login");
  //   pasa al siguiente middleware
  next();
};

// exportar el modulo para usarlo en los enrutadores
module.exports = { requireAuth };
