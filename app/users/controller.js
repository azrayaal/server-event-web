const User = require('./model');
const bcrypt = require('bcryptjs');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const user = await User.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/category/view_category', {
        user,
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
};
