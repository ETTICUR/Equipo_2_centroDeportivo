const express = require("express");
const path = require("path");
const dotenv = require('dotenv').config();

const app = express();

app.set("view engine", "ejs")

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.get("/productCart", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/productCart.html"));
});

app.get("/productDetail", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/productDetail.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});

app.get("/productCreate", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/productCreate.html"));
});

app.get("/productEdit", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/productEdit.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor abierto en puerto " + process.env.PORT);
});
