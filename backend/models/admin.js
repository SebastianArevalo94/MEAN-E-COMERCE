const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = Schema({
  nombres: { type: String, required: false },
  apellidos: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dni: { type: String, required: false },
  role: { type: String, required: true },
  telefono: { type: String, required: false },
});

module.exports = mongoose.model("admin", AdminSchema);
