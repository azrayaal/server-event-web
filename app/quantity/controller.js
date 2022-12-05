const Quantity = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const quantity = await Quantity.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/quantity/view_quantity', {
        quantity,
        alert,
        name: req.session.admin.name,
        title: 'Halaman qty',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/quantity');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/quantity/create', {
        name: req.session.admin.name,
        title: 'Halaman tambah qty',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/quantity');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { quantity, nama } = req.body;

      let qty = await Quantity({ quantity, nama });
      await qty.save();

      req.flash('alertMessage', 'Berhasil tambah qty');
      req.flash('alertStatus', 'success');

      res.redirect('/quantity');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/quantity');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const quantity = await Quantity.findOne({ _id: id });

      res.render('admin/quantity/edit', {
        quantity,
        name: req.session.admin.name,
        title: 'Halaman ubah quantity',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/quantity');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity, name } = req.body;

      await Quantity.findOneAndUpdate(
        {
          _id: id,
        },
        { quantity, name }
      );

      req.flash('alertMessage', 'Berhasil ubah qty');
      req.flash('alertStatus', 'success');

      res.redirect('/quantity');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/quantity');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Quantity.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil hapus qty');
      req.flash('alertStatus', 'success');

      res.redirect('/quantity');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/quantity');
    }
  },
};
