const Event = require('./model');
const Category = require('../category/model');
const Talent = require('../talent/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.find();
      const talent = await Talent.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const event = await Event.find().populate('category').populate('talent');

      console.log('alert >>');
      console.log(alert);

      res.render('admin/event/view_event', {
        category,
        talent,
        event,
        alert,
        name: req.session.admin.name,
        title: 'Halaman event',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },

  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const talent = await Talent.find();
      const event = await Event.find();
      res.render('admin/event/create', {
        category,
        talent,
        event,
        name: req.session.admin.name,
        title: 'Halaman tambah event',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { event_name, description, date, location, category, talent, maps, agency_name } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const event = new Event({
              event_name,
              description,
              date,
              location,
              maps,
              category,
              talent,
              agency_name,
              banner: filename,
            });

            await event.save();

            req.flash('alertMessage', 'Berhasil tambah talent');
            req.flash('alertStatus', 'success');

            res.redirect('/event');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/event');
          }
        });
      } else {
        const event = new Event({ event_name, description, date, location, category, talent, banner, maps, agency_name });

        await event.save();

        req.flash('alertMessage', 'Berhasil tambah event');
        req.flash('alertStatus', 'success');
        res.redirect('/event');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },

  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.find();
      const talent = await Talent.find();
      const event = await Event.findOne({ _id: id }).populate('category').populate('talent');

      res.render('admin/event/detail', {
        category,
        talent,
        event,
        name: req.session.admin.name,
        title: 'Halaman ubah event',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.find();
      const talent = await Talent.find();
      const event = await Event.findOne({ _id: id }).populate('category').populate('talent');

      res.render('admin/event/edit', {
        category,
        talent,
        event,
        name: req.session.admin.name,
        title: 'Halaman ubah event',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { event_name, description, date, location, category, talent, maps, agency_name } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const event = await Event.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${event.banner}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Event.findOneAndUpdate(
              {
                _id: id,
              },
              {
                event_name,
                description,
                date,
                location,
                category,
                talent,
                maps,
                agency_name,
                banner: filename,
              }
            );

            req.flash('alertMessage', 'Berhasil ubah talent');
            req.flash('alertStatus', 'success');

            res.redirect('/event');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/event');
          }
        });
      } else {
        await Event.findOneAndUpdate(
          {
            _id: id,
          },
          { event_name, description, date, location, category, talent, maps, agency_name }
        );

        req.flash('alertMessage', 'Berhasil ubah event');
        req.flash('alertStatus', 'success');

        res.redirect('/event');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Event.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil hapus event');
      req.flash('alertStatus', 'success');

      res.redirect('/event');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let event = await Event.findOne({ _id: id });

      let status = event.status === 'Publish' ? 'Ended' : 'Publish';

      event = await Event.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );

      req.flash('alertMessage', 'Berhasil ubah status');
      req.flash('alertStatus', 'success');

      res.redirect('/event');
    } catch (error) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },
};
