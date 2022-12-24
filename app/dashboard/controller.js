const Event = require('../Event/model');
const Request = require('../request/model');
const Admin = require('../admins/model');
const User = require('../users/model');
const Transaction = require('../transaction/model');

module.exports = {
  index: async (req, res) => {
    try {
      const event = await Event.countDocuments();
      const admin = await Admin.countDocuments();
      const user = await User.countDocuments();
      const request = await Request.countDocuments();
      const transaction = await Transaction.countDocuments();
      res.render('admin/dashboard/view_dashboard', {
        name: req.session.admin.name,
        title: 'dashboard',
        count: {
          event,
          admin,
          user,
          request,
          transaction,
        },
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  },
};
