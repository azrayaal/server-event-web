const Event = require('../event/model');
const Category = require('../category/model');
const Request = require('../request/model');
const Talent = require('../talent/model');
const Transaction = require('../transaction/model');
const User = require('../users/model');
const Quantity = require('../quantity/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
  landingPage: async (req, res) => {
    try {
      const event = await Event.find({ status: 'Publish' });
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

  detailCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id }).populate('quantity');
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Terjadi kesalahan pada server' });
    }
  },

  detailQuantity: async (req, res) => {
    try {
      const { id } = req.params;
      const quantity = await Quantity.findOne({ _id: id }).populate('quantity');
      res.status(200).json({ data: quantity });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Terjadi kesalahan pada server' });
    }
  },

  profile: async (req, res) => {
    try {
      const user = {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        image: req.user.image,
        phone_number: req.user.phoneNumber,
      };

      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  getProfileUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Terjadi kesalahan pada server' });
    }
  },

  getDetailProfileUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.find({ _id: id });
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Terjadi kesalahan pada server' });
    }
  },

  editProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name = '', phoneNumber = '' } = req.body;
      const payload = {};

      if (name.length) payload.name = name;
      if (phoneNumber.length) payload.phoneNumber = phoneNumber;
      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          let user = await User.findOne({ _id: id });
          // let user = await User.findOne({ _id: id });

          let currentImage = `${config.rootPath}/public/uploads/${user.avatar}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          user = await User.findOneAndUpdate(
            {
              _id: id,
            },
            { payload, avatar: filename }
          );

          res.status(200).json({
            data: {
              _id: user._id,
              email: user.email,
              name: user.name,
              phoneNumber: user.phoneNumber,
              avatar: user.avatar,
            },
          });
        });

        src.on('err', async () => {
          next(err);
        });
      } else {
        const user = await User.findOneAndUpdate(
          {
            _id: id,
          },
          payload,
          { new: true, runValidators: true }
        );

        res.status(200).json({
          data: {
            _id: user._id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
          },
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Terjadi kesalahan pada server' });
    }
  },

  requestPage: async (req, res) => {
    try {
      const payload = {
        event_name: req.body.event_name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        maps: req.body.maps,
        agencyName: req.body.agencyName,
        email: req.body.email,
        user: req.user._id,
        name: req.user.name,
      };

      const request = new Request(payload);

      await request.save();

      res.status(201).json({ data: request, message: 'berhasil Request' });
    } catch (error) {
      console.log(error);
    }
  },

  historyRequest: async (req, res) => {
    try {
      const { status = '' } = req.query;

      let criteria = {};

      if (status.length) {
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $options: 'i' },
        };
      }

      if (req.user._id) {
        criteria = {
          ...criteria,
          user: req.user._id,
        };
      }

      const history = await Request.find(criteria);

      res.status(200).json({
        data: history,
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  historyRequestDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const history = await Request.findOne({ _id: id });

      if (!history) return res.status(404).json({ message: 'request tidak ditemukan.' });

      res.status(200).json({ data: history });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  checkout: async (req, res) => {
    try {
      const { event_name, location, date, quantity, total, event, thumbnail } = req.body;

      // const res_voucher = await Voucher.findOne({ _id: voucher }).select('name caegory _id thumbnail user').populate('category').populate('user');
      // if (!res_voucher) return res.status(404).json({ message: 'voucher game tidak ditemukan.' });

      const res_category = await Category.findOne({ _id: category });
      if (!res_category) return res.status(404).json({ message: 'category tidak ditemukan.' });

      const res_thumbnail = await Event.findOne({ _id: thumbnail });
      if (!res_thumbnail) return res.status(404).json({ message: 'event tidak ditemukan.' });

      const payload = {
        historyTicketCat: {
          event_name,
          category: res_category._doc.category ? res_category._doc.category.category_name : '',
          thumbnail: res_thumbnail._doc.event ? res_thumbnail._doc.event.thumbnail : '',
          location,
          date,
          quantity,
          total,
        },

        user: req.user._id,
        name: req.user.name,
      };

      const transaction = new Transaction(payload);

      await transaction.save();

      res.status(201).json({
        data: transaction,
        message: 'berhasil CO',
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  history: async (req, res) => {
    try {
      const { status = '' } = req.query;

      let criteria = {};

      if (status.length) {
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $options: 'i' },
        };
      }

      if (req.user._id) {
        criteria = {
          ...criteria,
          user: req.user._id,
        };
      }

      const history = await Transaction.find(criteria);

      res.status(200).json({
        data: history,
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  historyDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const history = await Transaction.findOne({ _id: id });

      if (!history) return res.status(404).json({ message: 'history tidak ditemukan.' });

      res.status(200).json({ data: history });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  dashboard: async (req, res) => {
    try {
      const count = await Transaction.aggregate([
        { $match: { player: req.player._id } },
        {
          $group: {
            _id: '$category',
            value: { $sum: '$value' },
          },
        },
      ]);

      const category = await Category.find({});

      category.forEach((element) => {
        count.forEach((data) => {
          if (data._id.toString() === element._id.toString()) {
            data.name = element.name;
          }
        });
      });

      const history = await Transaction.find({ player: req.player._id }).populate('category').sort({ updatedAt: -1 });

      res.status(200).json({ data: history, count: count });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
