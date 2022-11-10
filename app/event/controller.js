const Event = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const event = await Event.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/event/view_event', {
        event,
        alert,
        // name: req.session.user.name,
        title: 'Halaman kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/event/create', {
        // name: req.session.user.name,
        title: 'Halaman tambah kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { event_name,  description, date, location } = req.body;

      let event = await Event({ event_name,  description, date, location });
      await event.save();

      req.flash('alertMessage', 'Berhasil tambah kategori');
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

      const event = await Event.findOne({ _id: id });

      res.render('admin/event/edit', {
        event,
        name: req.session.user.name,
        title: 'Halaman ubah kategori',
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
      const { event_name,  description, date, location } = req.body;

      await Event.findOneAndUpdate(
        {
          _id: id,
        },
        { event_name,  description, date, location }
      );

      req.flash('alertMessage', 'Berhasil ubah kategori');
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

      req.flash('alertMessage', 'Berhasil hapus kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/event');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/event');
    }
  },
};
