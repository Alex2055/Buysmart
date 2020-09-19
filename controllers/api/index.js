const router = require('express').Router();

const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const storeRoutes = require('./store-routes');
const categoryRoutes = require('./category-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/stores', storeRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;