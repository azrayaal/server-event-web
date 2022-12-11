const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema(
  {
    historyTicketCat: {
      event_name: { type: String, require: [true, 'nama event harus diisi.'] },
      category: { type: String },
      banner: { type: String },
      date: { type: String },
      location: { type: String },
      total: { type: Number },
      description: { type: String },
      quantity: { type: Number },
    },

    historyRequest: {
      event_name: { type: String },
      description: { type: String },
      date: { type: String },
      location: { type: String },
      maps: { type: String },
      agencyName: { type: String },
      email: { type: String },
    },

    name: {
      type: String,
      require: [true, 'nama harus diisi'],
      maxlength: [225, 'panjang nama harus antara 3 - 225 karakter'],
      minlength: [3, 'panjang nama harus antara 3 - 225 karakter'],
    },

    accountUser: {
      type: String,
      require: [true, 'nama akun harus diisi'],
      maxlength: [225, 'panjang nama harus antara 3 - 225 karakter'],
      minlength: [3, 'panjang nama harus antara 3 - 225 karakter'],
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },

    historyUser: {
      name: { type: String, require: [true, 'nama player harus diisi.'] },
      phoneNumber: {
        type: Number,
        require: [true, 'nama akun harus diisi'],
        maxlength: [13, 'panjang nama harus antara 9 - 13 karakter'],
        minlength: [9, 'panjang nama harus antara 9 - 13 karakter'],
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
