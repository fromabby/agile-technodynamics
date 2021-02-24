const express = require('express')
const router = express.Router();

const{getHomePage, updateHomePage} = require('../controllers/homePageController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/homepage').get(getHomePage);
router.route('/admin/updatehome').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'),updateHomePage);





module.exports = router;