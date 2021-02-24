const express = require('express')
const router = express.Router();

const{ newAbout, getAllAbout, getSingleAbout, updateAbout, getAboutCompany,getAboutObjectives,getAboutScope,getAboutMission, 
getAboutVision, getAboutHistory } = require('../controllers/aboutController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/newabout').post(newAbout);
router.route('/allaboutus').get(getAllAbout);
router.route('/about/:id').get(getSingleAbout);
router.route('/admin/about/:id').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'),updateAbout);

// get single parts of about us
router.route('/aboutcompany').get(getAboutCompany);
router.route('/aboutobjectives').get(getAboutObjectives);
router.route('/aboutscope').get(getAboutScope);
router.route('/aboutmission').get(getAboutMission);
router.route('/aboutvision').get(getAboutVision);
router.route('/abouthistory').get(getAboutHistory);


module.exports = router