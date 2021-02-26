const express = require('express')
const router = express.Router();

const{getHomePage, updateHomePage, newHomePage, getAllHomePage} = require('../controllers/homeController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/home/:id').get(getHomePage);
router.route('/newhome').post(newHomePage);
router.route('/homes').get(getAllHomePage);
router.route('/admin/home/:id').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'),updateHomePage);


module.exports = router;