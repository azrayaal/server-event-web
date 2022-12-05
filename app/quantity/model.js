const mongoose = require('mongoose');

let quantityScheme = mongoose.Schema(
  {
    nama: {
      type: String,
      require: [true, 'quantity diiisi'],
    },
    quantity: {
      type: Number,
      require: [true, 'quantity diiisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quantity', quantityScheme);
