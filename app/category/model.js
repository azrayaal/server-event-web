const mongoose = require('mongoose');

let categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      require: [true, 'Nama category harus diiisi'],
    },
    price: {
      type: Number,
      require: [true, 'harga harus diiisi'],
    },
    category_qty: {
      type: Number,
      default: 0,
      require: [true, 'harga harus diiisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
