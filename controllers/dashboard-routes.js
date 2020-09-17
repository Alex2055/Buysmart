const router = require('express').Router();
const { Store, Product } = require('../models')
const withAuth = require("../utils/auth");


router.get('/add',
    withAuth,
    async (req, res) => {
        await Store.findAll({
            where: {
                user_id: req.session.userId
            },
            attributes: ['id', 'store_name', 'city', 'state', 'zip'],
            raw: true,
        })
            .then(dbStoreData => {
                const stores = dbStoreData;
                res.render('add-product', { stores })
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
            })
    });

// show products for slected store and/or category 
router.get('/:order?',
    withAuth,
    async (req, res) => {
        const products = await Product.findAll({
            where: {
                user_id: req.session.userId
            },
            limit: 20,
            order: [
                [req.params.order || 'rating', 'DESC']
            ],
            raw: true
        });
        const categories = await Product.findAll({
            where: {
                user_id: req.session.userId
            },
            attributes: ['category'],
            group: ['category'],
            raw: true
        });
        const stores = await Store.findAll({
            where: {
                user_id: req.session.userId
            },
            raw: true
        });

        //rating stars
        for (let i = 0; i < products.length; i++) {
            let stars = [];
            for (let u = 0; u < 5; u++) {
                if (u < products[i].rating) {
                    stars.push(true);
                }
                else {
                    stars.push(false);
                }
            }
            products[i].stars = stars;
        };

        res.render('search-view', { products, categories, stores })
    });

//one product by id
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
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found.' });
                return;
            }
//rating stars for this product
            const product = dbProductData.get({ plain: true });
            let stars = [];
            for (let u = 0; u < 5; u++) {
                if (u < product.rating) {
                    stars.push(true);
                }
                else {
                    stars.push(false);
                }

                product.stars = stars;
            };
            res.render('single-product', { product });
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });


module.exports = router;