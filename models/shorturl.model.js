const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var URLSchema = new mongoose.Schema({
  fullurl: {
    type: String,
    required: true,
  },
  shortcode: {
    type: String,
    required: true,
  },
  shorturl: {
    type: String,
  },
  count: {
    type: Number,
    default: 0,
  },
});

//Export the model
module.exports = mongoose.model('ShortURL', URLSchema);
