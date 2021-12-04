const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FechaSchema = Schema({
  estado: String,
  fecha: String,
});

module.exports = mongoose.model('estado', FechaSchema);
