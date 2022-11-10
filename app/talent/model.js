const mongoose = require('mongoose');

let talentSchema = mongoose.Schema(
  {
    talent_picture: {
      type: String,
    },
    talent_name: {
      type: String,
      require: [true, 'Nama talent harus diiisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Talent', talentSchema);
