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
  talent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Talent',
      },
    ],
   category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
