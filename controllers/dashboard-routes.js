const router = require('express').Router();
const { User, Store, Product } = require('../models')
const withAuth = require("../utils/auth");

router.get('/add', 
 withAuth, 
(req, res) => {

    res.render('add-product');
});

router.get('/:order?', 
 withAuth, 
(req, res) => {
    Product.findAll({
     order: [
         [req.params.order || 'id', 'ASC']
     ]

    }).then(dbProductData => {
        
        const products = dbProductData.map(product => product.get());
            res.render('search-view', { products });
       
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/view/:id', 
 withAuth, 
(req, res) => {
    Product.findOne({
    where: {
        id: req.params.id
    },
    attributes: [
        'id',
        'product_name',
        'description',
        'category',
        'size',
        'price',
        'rating'
    ],
    include: [
        {
        model: Store,
        attributes: ['store_name', 'city', 'state'],
        }]
    }).then(dbProductData => {
        if(!dbProductData) {
            res.status(404).json({ message: 'No product found.' });
            return;
        }
        
        const product = dbProductData.get({ plain: true});
            res.render('single-product', { product });
           })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;