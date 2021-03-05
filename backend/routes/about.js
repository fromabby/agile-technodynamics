const express = require('express')
const router = express.Router();

const{ newAbout, getAllAbout, getSingleAbout, updateAbout, getAboutCompany,getAboutObjectives,getAboutScope,getAboutMission, 
getAboutVision, getAboutHistory } = require('../controllers/aboutController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/newabout').post(newAbout);
router.route('/abouts').get(getAllAbout);
router.route('/about/:id').get(getSingleAbout);
router.route('/admin/about/:id').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'),updateAbout);

module.exports = router