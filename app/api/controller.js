const Event = require('../event/model');
const Category = require('../category/model');
const Talent = require('../talent/model');

module.exports = {
  landingPage: async (req, res) => {
    try {
      const event = await Event.find();
      res.status(200).json({ data: event });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Terjadi kesalahan pada server' });
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne({ _id: id }).populate('category').populate('talent');
      res.status(200).json({ data: event });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Terjadi kesalahan pada server' });
    }
  },
};
