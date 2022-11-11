const Event = require('../event/model');
// const Request = require('../request/model');
const User = require('../users/model');

module.exports = {
  index: async (req, res) => {
    try {
      const event = await Event.countDocuments();
      const user = await User.countDocuments();
      res.render('admin/dashboard/view_dashboard', {
        name: req.session.user.name,
        title: 'dashboard',
        count: {
          event,
          user,
          //   request,
        },
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  },
};
