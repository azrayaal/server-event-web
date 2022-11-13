const Admin = require('./model');
const bcrypt = require('bcryptjs');

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.admin === null || req.session.admin === undefined) {
        res.render('admin/admins/view_signin', {
          alert,
          title: 'Halaman SignIn',
        });
      } else {
        res.redirect('/dashboard');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await Admin.findOne({ email: email });
      console.log('check>');
      console.log(check);

      if (check) {
        if (check.status === 'Y') {
          const checkPassword = await bcrypt.compare(password, check.password);
          if (checkPassword) {
            req.session.admin = {
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
