const Event = require('../event/model');
// const Request = require('../request/model');
const Admin = require('../admins/model');

module.exports = {
  index: async (req, res) => {
    try {
      const event = await Event.countDocuments();
      const admin = await Admin.countDocuments();
      res.render('admin/dashboard/view_dashboard', {
        name: req.session.user.name,
        title: 'dashboard',
        count: {
          event,
          admin,
          //   request,
        },
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  },
};
