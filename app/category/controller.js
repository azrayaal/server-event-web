const Category = require('./model');
const Qty = require('../qty/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const category = await Category.find();
      const qty = await Qty.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/category/view_category', {
        category,
        qty,
        alert,
        name: req.session.admin.name,
        title: 'Halaman kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create', {
        name: req.session.admin.name,
        title: 'Halaman tambah kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { category_name, price } = req.body;
      const qty = await Qty.find();

      let category = await Category({ category_name, price, qty });
      await category.save();

      req.flash('alertMessage', 'Berhasil tambah kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });

      res.render('admin/category/edit', {
        category,
        name: req.session.admin.name,
        title: 'Halaman ubah kategori',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name, price } = req.body;

      await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { category_name, price }
      );

      req.flash('alertMessage', 'Berhasil ubah kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Category.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil hapus kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
};
