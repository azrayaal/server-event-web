var express = require('express');
var router = express.Router();
const { landingPage, detailPage, requestPage } = require('./controller');

router.get('/landingpage', landingPage);
router.get('/detail/:id', detailPage);
router.post('/request', requestPage);

module.exports = router;
