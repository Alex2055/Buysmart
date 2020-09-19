const router = require('express').Router();
const { Product, Store, User, Category } = require('../../models');
const withAuth = require('../../utils/auth');


//Display all products in order by rating
router.get('/', (req, res) => {
    Product.findAll({
        order: [['rating', 'DESC']],
        attributes: [
            'id',
            'product_name',
            'category_id',
            'price',
            'rating',
            'user_id'
        ],
        include: [
            {
                model: Store,
                attributes: ['store_name']
            },
            {
                model: Category,
                attributes: ['category_name', 'user_id']
            },
            {
                model: User,
                attributes: ['id']
            }
        ]
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//filter products by store and/or category
router.get('/filtered', async (req, res) => {
    const store_id = req.query.store_id;
    const category_id = req.query.category_id;
    const conditions = {};
    if (store_id) {
        conditions.store_id = store_id;
    }
    if (category_id) {
        conditions.category_id = category_id;
    }
    const products = await Product.findAll({
        where: conditions,
        order: [['rating', 'DESC']],
        raw: true
    });
    res.json(products)
});

//Display individual product by id
router.get('/:id', (req, res) => {
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
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//Add a new product
router.post('/',
    withAuth,
    (req, res) => {
        Product.create({
            product_name: req.body.product_name,
            category_id: req.body.category_id,
            description: req.body.description,
            price: req.body.price,
            size: req.body.size,
            rating: req.body.rating,
            user_id: req.session.userId,
            store_id: req.body.store_id
        })
            .then(dbProductData => res.json(dbProductData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });

//Update product
router.put('/:id', (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
            // user_id: req.session.userId
        }
    }
    )
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//remove product
router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router
