const Transaction = require('./model');
const bcrypt = require('bcryptjs');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find();

      console.log('alert >>');
      console.log(alert);

      res.render('admin/transaction/view_transaction', {
        transaction,
        alert,
        name: req.session.admin.name,
        title: 'Halaman transaction',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let transaction = await Transaction.findOne({ _id: id });

      let status = transaction.status === 'success' ? 'failed' : 'success';

      transaction = await Transaction.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );

      req.flash('alertMessage', `Berhasil ubah status`);
      req.flash('alertStatus', 'success');
      res.redirect('/transaction');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },

  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;
      // const category = await Category.find();
      // const talent = await Talent.find();
      const transaction = await Transaction.findOne({ _id: id });

      res.render('admin/transaction/detail', {
        transaction,
        name: req.session.admin.name,
        title: 'Halaman detail transaction',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Transaction.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Transaction berhasil ditolak');
      req.flash('alertStatus', 'success');

      res.redirect('/transaction');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },
};
