const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
// const helmet = require("helmet");

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Connexion à la DB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_PASS}@cluster0.iq56q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Connexion à MongoDB échouée"));

app.use(express.json());
// app.use(helmet());

app.use((req, res, next) => {
  // On gère le CORS pour autoriser toutes les requêtes
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
