var express = require('express');
var router = express.Router();
const { landingPage, detailPage, requestPage, editProfile, getProfileUser, actionEdit, editProfiless, getDetailProfileUser } = require('./controller');
const multer = require('multer');
const os = require('os');

// const { isLoginAdmin } = require('../middleware/auth');

// router.use(isLoginAdmin);

router.get('/landingpage', landingPage);
router.get('/getprofileuser', getProfileUser);
router.get('/detail/:id', detailPage);
router.get('/detailprofile/:id', getDetailProfileUser);
router.post('/request', requestPage);
router.put('/editprofile/:id', multer({ dest: os.tmpdir() }).single('image'), editProfile);
// router.put('/editprofile/:id', editProfile);
// router.put('/edit/:id', actionEdit);
module.exports = router;