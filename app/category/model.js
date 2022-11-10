const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
  category_name: {
    type: String,
    require: [true, 'Nama category harus diiisi']
  },
  price: {
    type: String,
    require: [true, 'harga harus diiisi']
  },
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)
