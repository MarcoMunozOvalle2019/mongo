const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Healthchema = Schema({
  nota: String,
  fecha: String,
});

module.exports = mongoose.model('healthCheck', Healthchema);
