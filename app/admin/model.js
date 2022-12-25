const mongoose = require('mongoose');

let adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email harus diiisi'],
    },
    name: {
      type: String,
      require: [true, 'Nama harus diiisi'],
    },
    password: {
      type: String,
      require: [true, 'Password harus diiisi'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin',
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    phoneNumber: {
      type: String,
      // require: [true, 'Nomor telefon harus diiisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);

//
