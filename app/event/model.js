const mongoose = require('mongoose')

let eventSchema = mongoose.Schema({
  event_name: {
    type: String,
    require: [true, 'Nama event harus diiisi']
  },
  description: {
    type: String,
    require: [true, 'deskripsi harus diiisi']
  },
  date: {
    type: String,
    require: [true, 'tanggal harus diiisi']
  },
  location: {
    type: String,
    require: [true, 'lokasi harus diiisi']
  },
  talent: {
    type: String,
    require: [true, 'talent harus diiisi']
  },
  category: {
    type: String,
    require: [true, 'category harus diiisi']
  },
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
