const Qty = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const qty = await Qty.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/qty/view_qty', {
        qty,
        alert,
        name: req.session.admin.name,
        title: 'Halaman qty',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/qty');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/qty/create', {
        name: req.session.admin.name,
        title: 'Halaman tambah qty',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/qty');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { category_qty, nama } = req.body;

      let qty = await Qty({ category_qty, nama });
      await qty.save();

      req.flash('alertMessage', 'Berhasil tambah qty');
      req.flash('alertStatus', 'success');

      res.redirect('/qty');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/qty');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const qty = await Qty.findOne({ _id: id });

      res.render('admin/qty/edit', {
        qty,
        name: req.session.admin.name,
        title: 'Halaman ubah qty',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/qty');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { category_qty } = req.body;

      await Qty.findOneAndUpdate(
        {
          _id: id,
        },
        { category_qty }
      );

      req.flash('alertMessage', 'Berhasil ubah qty');
      req.flash('alertStatus', 'success');

      res.redirect('/qty');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/qty');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Qty.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil hapus qty');
      req.flash('alertStatus', 'success');

      res.redirect('/qty');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/qty');
    }
  },
};
