const mongoose = require('mongoose');

let cartSchema = mongoose.Schema(
  {
    category_qty: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
