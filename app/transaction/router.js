var express = require('express');
var router = express.Router();
const { index, actionStatus, viewDetail, actionDelete } = require('./controller');

const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.put('/status/:id', actionStatus);
router.get('/detail/:id', viewDetail);
router.delete('/delete/:id', actionDelete);

module.exports = router;
