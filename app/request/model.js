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
      require: [true, 'tanggal harus diiisi'],
    },
    location: {
      type: String,
      require: [true, 'lokasi harus diiisi'],
    },
    agencyName: {
      type: String,
      require: [true, 'agensi harus diiisi'],
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
