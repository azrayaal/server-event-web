const mongoose = require('mongoose');

let eventSchema = mongoose.Schema(
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
    maps: {
      type: String,
      require: [true, 'lokasi harus diiisi'],
    },
    agency_name: {
      type: String,
      require: [true, 'agency_name harus diiisi'],
    },
    banner: {
      type: String,
    },
    talent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Talent',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: [true, 'category harus diiisi'],
      },
    ],
    status: {
      type: String,
      enum: ['Publish', 'Hold', 'Ended'],
      default: 'Hold',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
