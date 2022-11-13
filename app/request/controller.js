const Request = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      // const talent = await Talent.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const request = await Request.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/request/view_request', {
        request,
        alert,
        name: req.session.user.name,
        title: 'Halaman request',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/request');
    }
  },

  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;
      // const category = await Category.find();
      // const talent = await Talent.find();
      const request = await request.findOne({ _id: id });

      res.render('admin/request/detail', {
        request,
        name: req.session.user.name,
        title: 'Halaman detail request',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/request');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Request.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil hapus request');
      req.flash('alertStatus', 'success');

      res.redirect('/request');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/request');
    }
  },
};
