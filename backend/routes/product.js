const express = require('express')
const router = express.Router();

const{ getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, getAdminProducts } = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products').get(getAdminProducts);

// Admin Roles
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'), newProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'), updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin', 'superadmin'), deleteProduct);

module.exports = router;