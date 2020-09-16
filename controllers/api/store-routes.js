const router = require('express').Router();
const { Product, Store } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//Display all stores
router.get('/', (req, res) => {
    Store.findAll({ })
    .then(dbStoreData => res.json(dbStoreData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
     })
});

//Display one store with associated products in descending order based on rating
router.get('/:id', withAuth, (req, res) => {
    Store.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Product,
            attributes: ['product_name', 'category', 'size', 'price', 'rating'],
            order: [['rating', 'DESC']],  
        }],
    })
    .then(dbStoreData => {
        if(!dbStoreData) {
            res.status(404).json({ message: 'This store does not exist.'});
            return;
        }
        res.json(dbStoreData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
   
//Add new store
router.post('/', withAuth, (req, res) => {
    Store.create({
        store_name: req.body.store_name,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        user_id: req.session.userId
        })
    .then(dbStoreData => res.json(dbStoreData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    });


//Update store
router.put('/:id', withAuth, (req, res) => {
    Store.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbStoreData => {
        if (!dbStoreData) {
            res.status(404).json({ message: 'No store found with this id'});
            return;
         }
         res.json(dbStoreData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        })
});

//Delete store
router.delete('/:id', withAuth, (req, res) => {
Store.destroy({
    where: {
        id: req.params.id
    }
})
.then(dbStoreData => {
    if (!dbStoreData) {
        res.status(404).json({ message: 'No store found with this id' });
        return;
    }
    res.json(dbStoreData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
});

module.exports = router;