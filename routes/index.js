var express = require('express');
const { isLoginAdmin } = require('../app/middleware/auth');
var router = express.Router();

router.use(isLoginAdmin);
/* GET home page. */ router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
