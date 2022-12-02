const Event = require('../event/model');
const Category = require('../category/model');
const Request = require('../request/model');
const Talent = require('../talent/model');
const User = require('../users/model');

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

  requestPage: async (req, res) => {
    try {
      await Request.create({
        event_name: req.body.event_name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        maps: req.body.maps,
        agencyName: req.body.agencyName,
        email: req.body.email,
      });
      res.status(201).json({ message: 'Request berhasil ditambahkan' });
    } catch (error) {
      console.log(error);
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

  editProfile: async (req, res, next) => {
    try {
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
          let user = await User.findOne({ _id: req.user._id });

          let currentImage = `${config.rootPath}/public/uploads/${user.avatar}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          user = await User.findOneAndUpdate(
            {
              _id: req.user._id,
            },
            {
              ...payload,
              avatar: filename,
            },
            { new: true, runValidators: true }
          );

          console.log(user);

          res.status(201).json({
            data: {
              id: user.id,
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
            _id: req.user._id,
          },
          payload,
          { new: true, runValidators: true }
        );

        res.status(201).json({
          data: {
            id: user.id,
            name: user.name,
            username: user.username,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
          },
        });
      }
    } catch (err) {
      if (err && err.name === 'ValidationError') {
        res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
    }
  },
};
