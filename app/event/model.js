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
    time: {
      type: String,
      require: [true, 'lokasi harus diiisi'],
    },
    organizer: {
      type: String,
      require: [true, 'lokasi harus diiisi'],
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
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    status: {
      type: String,
      enum: ['Publish', 'Hold', 'Ended'],
      default: 'Publish',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
