var express = require('express');
var router = express.Router();
const { landingPage, detailPage, requestPage, editProfile } = require('./controller');
const multer = require('multer');
const os = require('os');

router.get('/landingpage', landingPage);
router.get('/detail/:id', detailPage);
router.post('/request', requestPage);
router.put('/editprofile/:id', multer({ dest: os.tmpdir() }).single('image'), editProfile);
module.exports = router;
