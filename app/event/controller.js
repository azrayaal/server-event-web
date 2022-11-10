const Event = require('./model');
const Category = require('../category/model');
const Talent = require('../talent/model');

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
        // name: req.session.user.name,
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
        // name: req.session.user.name,
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
      const { event_name, description, date, location, category, talent } = req.body;

      let event = await Event({ event_name, description, date, location, category, talent });
      await event.save();

      req.flash('alertMessage', 'Berhasil tambah event');
      req.flash('alertStatus', 'success');

      res.redirect('/event');
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
        // name: req.session.user.name,
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
      const { event_name, description, date, location, category, talent } = req.body;

      await Event.findOneAndUpdate(
        {
          _id: id,
        },
        { event_name, description, date, location, category, talent }
      );

      req.flash('alertMessage', 'Berhasil ubah event');
      req.flash('alertStatus', 'success');

      res.redirect('/event');
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
};
