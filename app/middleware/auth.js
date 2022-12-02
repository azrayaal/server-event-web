module.exports = {
  isLoginAdmin: (req, res, next) => {
    if (req.session.admin === null || req.session.admin === undefined) {
      req.flash('alertMessage', `Session anda telah habis silahkan login kembali`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    } else {
      next();
    }
  },
};
