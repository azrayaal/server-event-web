const config = require('../../config');
const jwt = require('jsonwebtoken');
const User = require('../users/model');

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

  isLoginUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

      const data = jwt.verify(token, config.jwtKey);

      const user = await User.findOne({ _id: data.user.id });

      if (!user) {
        throw new Error();
      }

      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      res.status(401).json({
        error: 'Not authorized to acces this resource',
      });
    }
  },
};
