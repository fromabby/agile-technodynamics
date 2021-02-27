const express = require('express')
const router = express.Router();

const{newService, getAllServices, getSingleService, updateService} = require('../controllers/servicesController');

router.route('/newservices').post(newService)
router.route('/services').get(getAllServices)
router.route('/service/:id').get(getSingleService)
router.route('/service/:id').put(updateService)


module.exports = router