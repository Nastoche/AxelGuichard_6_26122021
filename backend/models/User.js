const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Modèle d'un utilisateur qui sera stocké sur la DB
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator);
