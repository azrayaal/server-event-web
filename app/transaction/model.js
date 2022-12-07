const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema(
  {
    historyTicketCat: {
      event_name: { type: String, require: [true, 'nama game harus diisi.'] },
      category: { type: String, require: [true, 'kategori harus diisi.'] },
      thumbnail: { type: String },
      date: { type: String },
      location: { type: String },
      total: { type: Number },
      quantity: { type: Number },
      description: { type: String },
    },

    historyRequest: {
      // name: { type: String, require: [true, 'nama harus diisi.'] },
      // type: { type: String, require: [true, 'tipe pembayaran harus diisi.'] },
      // bankName: { type: String, require: [true, 'nama bank harus diisi.'] },
      // noRekening: { type: String, require: [true, 'nomor rekening harus diisi.'] },
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

    // quantity: {
    //   type: Number,
    //   default: 0,
    // },

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

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
