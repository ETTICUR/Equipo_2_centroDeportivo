const express = require("express");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv").config();
const methodOverride = require("method-override");
const expressSession = require("express-session");

const mainRoutes = require("./router/mainRoutes");
const productRoutes = require("./router/productRoutes");
const usersRoutes = require("./router/usersRoutes");
const personaLogueada = require("./middlewares/users/authLogin");

const app = express();

app.set("view engine", "ejs");

app.set("views", [
  path.join(__dirname, "./views/productViews"),
  path.join(__dirname, "./views/usersViews"),
  path.join(__dirname, "./views/mainViews"),
]);

app.use(express.static("public"));

app.use(
  session({
    secret: "es un secreto shh",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(mainRoutes);

app.use("/producto", productRoutes);

app.use(usersRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor abierto en puerto " + process.env.PORT);
});
