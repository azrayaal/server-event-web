const mongoose = require('mongoose');

let qtySchema = mongoose.Schema(
  {
    nama: {
      type: String,
      require: [true, 'quantity diiisi'],
    },
    category_qty: {
      type: Number,
      require: [true, 'quantity diiisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Qty', qtySchema);
