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
    quantity: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Qyt',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
