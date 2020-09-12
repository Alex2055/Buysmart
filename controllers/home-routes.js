const router = require('express').Router();
const Product = require('../models/product')
const withAuth = require("../utils/auth");


router.get('/', (req, res) => {
    res.redirect('/home');
  })

router.get('/home', 
// withAuth, 
(req, res) => {

    res.render('homepage');
})
router.get('/add-product', 
// withAuth, 
(req, res) => {

    res.render('add-product');
})
router.get('/signin', (req, res) => {

    res.render('signin');
})

router.get('/signup', (req, res) => {

    res.render('signup');
})

router.get('/search-view/:order?', 
// withAuth, 
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

router.get('/product/:id', 
// withAuth, 
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
    // include: [
    //     {
    //     model: Store,
    //     attributes: ['store_name', 'city', 'state'],
    //     }]
    }).then(dbProductData => {
        
        const product = dbProductData.get({ plain: true});
            res.render('single-product', { product });
           })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;