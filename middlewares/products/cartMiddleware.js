module.exports = (req, res, next) => {
  if (req.session.carrito == undefined) {
    req.session.carrito = [];
    next();
  } else {
    next();
  }
};
