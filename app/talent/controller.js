const Talent = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const talent = await Talent.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/talent/view_talent', {
        talent,
        alert,
        // name: req.session.user.name,
        title: 'Halaman kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/talent/create', {
        // name: req.session.user.name,
        title: 'Halaman tambah kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { talent_name, talent_picture } = req.body;

      let talent = await Talent({ talent_name, talent_picture });
      await talent.save();

      req.flash('alertMessage', 'Berhasil tambah kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/talent');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const talent = await Talent.findOne({ _id: id });

      res.render('admin/talent/edit', {
        talent,
        name: req.session.user.name,
        title: 'Halaman ubah kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { talent_name, talent_picture } = req.body;

      await Talent.findOneAndUpdate(
        {
          _id: id,
        },
        { talent_name, talent_picture }
      );

      req.flash('alertMessage', 'Berhasil ubah kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/talent');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Talent.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil hapus kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/talent');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/talent');
    }
  },
};
