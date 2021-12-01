const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FechaSchema = Schema({
  nota: String,
  fecha: String,
});

module.exports = mongoose.model('historico', FechaSchema);
