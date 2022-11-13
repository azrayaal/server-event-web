var express = require('express');
var router = express.Router();
const { index, actionDelete, viewDetail } = require('./controller');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);

router.get('/', index);
router.get('/detail/:id', viewDetail);
router.delete('/delete/:id', actionDelete);

module.exports = router;
