const User = require('./model');
const bcrypt = require('bcryptjs');

module.exports = {
  view_signin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/view_signin', {
          alert,
          title: 'Halaman SignIn',
        });
      } else {
        res.redirect('/dashboard');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email: email });
      console.log('check>');
      console.log(check);

      if (check) {
        if (check.status === 'Y') {
          const checkPassword = await bcrypt.compare(password, check.password);
          if (checkPassword) {
            req.session.user = {
              id: check._id,
              email: check.email,
              status: check.status,
              name: check.name,
            };
            res.redirect('/dashboard');
          } else {
            req.flash('alertMessage', `Kata sanda yang anda masukan salah`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
          }
        } else {
          req.flash('alertMessage', `Status anda belum aktif`);
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', `Email salah`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },

  actionLogout: async (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },
};
