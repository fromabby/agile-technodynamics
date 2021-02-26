const express = require('express')
const router = express.Router();

const{getHomePage, updateHomePage, newHomePage, getAllHomePage} = require('../controllers/homePageController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/home/:id').get(getHomePage);
router.route('/newhome').post(newHomePage);
router.route('/allhome').get(getAllHomePage);
router.route('/admin/home/:id').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'),updateHomePage);





module.exports = router;