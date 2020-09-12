const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const productRoutes = require('./product-routes.js');
const storeRoutes = require('./store-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/stores', storeRoutes);

module.exports = router;