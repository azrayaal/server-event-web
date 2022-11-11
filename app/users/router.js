var express = require('express');
var router = express.Router();
const { view_signin, actionSignin, actionLogout } = require('./controller');

// // const { isLoginAdmin } = require('../middleware/auth')

// // router.use(isLoginAdmin);

router.get('/', view_signin);
router.post('/', actionSignin);
router.get('/logout', actionLogout);

module.exports = router;
