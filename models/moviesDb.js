const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

const moviesDb = mongoose.model('moviesDb', moviesSchema);

module.exports = moviesDb;
