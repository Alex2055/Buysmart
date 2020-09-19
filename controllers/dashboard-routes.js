const router = require('express').Router();
const { Store, Product, Category } = require('../models')
const withAuth = require("../utils/auth");

//adding a new product, pulls stores and categories from respective models
router.get('/add', withAuth, async (req, res) => {
        const stores = await Store.findAll({
            where: {
                user_id: req.session.userId
            },
            attributes: ['id', 'store_name', 'city', 'state', 'zip'],
            raw: true,
            order: [
                ['store_name', 'ASC']
            ]
        })
            const categories = await Category.findAll({
                where: {
                    user_id: req.session.userId
                },
                attributes: ['id', 'category_name'],
                raw: true,
                order: [
                    ['category_name', 'ASC']
                ]
            })
            res.render('add-product', { stores, categories })
    });

// show products for slected store and/or category 
router.get('/:order?', withAuth, async (req, res) => {
        const products = await Product.findAll({
            where: {
                user_id: req.session.userId
            },
            limit: 20,
            order: [
                [req.params.order || 'rating', 'DESC']
            ],
            raw: true
        })
        const categories = await Category.findAll({
            where: {
                user_id: req.session.userId
            },
            order: [
                ['category_name', 'ASC']
        ],
            raw: true
        });
        const stores = await Store.findAll({
            where: {
                user_id: req.session.userId
            },
            order: [
                ['store_name', 'ASC']
            ],
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
// console.log(Product.id);
        res.render('search-view', { products, categories, stores })
    });

//one product by id
router.get('/view/:id', withAuth, (req, res) => {
        Product.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'product_name',
                'description',
                'category_id',
                'size',
                'price',
                'rating'
            ],
            include: [
                {
                    model: Store,
                    attributes: ['store_name', 'city', 'state'],
                },
            {
                model: Category,
                attributes: ['category_name']
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

    //pull all category options for drop-down menu
    router.get('/add-category', withAuth, async (req, res) => {
        await Category.findAll({
            where: {
                user_id: req.session.userId
            },
            attributes: ['id', 'category_name'],
            raw: true,
        })
            .then(dbCategoryData => {
                const categories = dbCategoryData;
                res.render('add-category', { categories })
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
            })
    });


router.get('/category-view/:id', withAuth, async (req, res) => {
await Category.findOne(
    {
        where: {
            id: req.params.id
        },
        attributes: ['id', 'category_name', 'user_id'],
        include: [
            {
                model: Product,
                attributes: ['product_name', 'description', 'size', 'price', 'rating']
            }
        ]  
        })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category found.' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch(err => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
        })
});

module.exports = router;