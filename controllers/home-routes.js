const router = require('express').Router();
const { User, Store, Product, Category } = require('../models')
const withAuth = require("../utils/auth");

//redirect from / to home page
router.get('/', (req, res) => {
    res.redirect('/home');
})

//home page
router.get('/home',
    withAuth,
    (req, res) => {

        res.render('homepage');
    })

//sign in page
router.get('/signin', (req, res) => {

    res.render('signin');
})

//sign up page
router.get('/signup', (req, res) => {

    res.render('signup');
});

//edit product page
router.get('/edit/:id', withAuth, (req, res) => {
     Product.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'product_name',
                'category_id',
                'description',
                'size',
                'price',
                'rating'
            ]
        })
            .then(dbProductData => {
                if (!dbProductData) {
                    res.status(404).json({ message: 'No information found.' });
                    return;
                }
                const product = dbProductData.get({ plain: true });
                res.render('edit-product', { product },);
            })
            .catch(err => {
                // console.log(err);
                res.status(500).json(err);
            });
    });

module.exports = router;