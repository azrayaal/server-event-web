var express = require('express');
var router = express.Router();
const {
  landingPage,
  detailPage,
  requestPage,
  editProfile,
  getProfileUser,
  actionEdit,
  editProfiless,
  getDetailProfileUser,
  detailCategory,
  detailQuantity,
  checkout,
  history,
  historyDetail,
  historyRequest,
  historyRequestDetail,
} = require('./controller');
const multer = require('multer');
const os = require('os');

const { isLoginUser } = require('../middleware/auth');

router.use(isLoginUser);

router.get('/landingpage', landingPage);
router.get('/getprofileuser', getProfileUser);
router.get('/detail/:id', detailPage);
router.get('/detailcategory/:id', detailCategory);
router.get('/detailprofile/:id', getDetailProfileUser);
router.put('/editprofile/:id', multer({ dest: os.tmpdir() }).single('image'), editProfile);
router.get('/detailquantity/:id', detailQuantity);

router.post('/request', isLoginUser, requestPage);
router.get('/historyrequest', isLoginUser, historyRequest);
router.get('/historyrequest/:id/detail', isLoginUser, historyRequestDetail);

router.post('/checkout', isLoginUser, checkout);
router.get('/history', isLoginUser, history);
router.get('/history/:id/detail', isLoginUser, historyDetail);
module.exports = router;
