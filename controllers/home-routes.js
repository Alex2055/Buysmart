const router = require('express').Router();
const { User, Store, Product } = require('../models')
const withAuth = require("../utils/auth");


router.get('/', (req, res) => {
    res.redirect('/home');
  })

router.get('/home', 
 withAuth, 
(req, res) => {

    res.render('homepage');
})

router.get('/signin', (req, res) => {

    res.render('signin');
})

router.get('/signup', (req, res) => {

    res.render('signup');
});


router.get('/edit/:id', 
withAuth,
(req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'product_name',
            'category',
            'description',
            'size',
            'price',
            'rating'
        ],
        include: [
            {
                model: Store,
                attributes: ['id']
            }
        ]
    })
    .then(dbProductData =>  {
        if(!dbProductData) {
            res.status(404).json({ message: 'No product found with this id'});
            return;
         }
         const product = dbProductData.get({ plain: true});
            res.render('edit-product', { product });
           })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;