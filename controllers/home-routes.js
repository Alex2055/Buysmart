const router = require('express').Router();
const Product = require('../models/product')


router.get('/', (req, res) => {
    res.redirect('/home');
  })

router.get('/home', (req, res) => {

    res.render('homepage');
})
router.get('/add-product', (req, res) => {

    res.render('add-product');
})



router.get('/signin', (req, res) => {

    res.render('signin');
})

router.get('/signup', (req, res) => {

    res.render('signup');
})

router.get('/search-view/:order?', (req, res) => {
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



module.exports = router;