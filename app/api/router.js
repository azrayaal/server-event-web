var express = require('express');
var router = express.Router();
const { landingPage, detailPage } = require('./controller');

router.get('/landingpage', landingPage);
router.get('/detail/:id', detailPage);

module.exports = router;
