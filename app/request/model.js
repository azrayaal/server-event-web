const mongoose = require('mongoose');

let requestSchema = mongoose.Schema(
  {
    event_name: {
      type: String,
      require: [true, 'Nama event harus diiisi'],
    },
    description: {
      type: String,
      require: [true, 'deskripsi harus diiisi'],
    },
    date: {
      type: String,
      // require: [true, 'tanggal harus diiisi'],
    },
    location: {
      type: String,
      require: [true, 'lokasi harus diiisi'],
    },
    maps: {
      type: String,
      require: [true, 'maps harus diiisi'],
    },
    agency_name: {
      type: String,
      require: [true, 'agensi harus diiisi'],
    },
    email: {
      type: String,
      require: [true, 'email harus diiisi'],
    },
    status: {
      type: String,
      enum: ['pending', 'accept', 'decline'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    },
    thumbnail: {
      type: String,
      require: [true, 'thumbnail harus diiisi'],
    },
    // user: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //   },
    // ],
    // AMBIL DATA EMAIL DAN USERNAMENYA
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
