const router = require('express').Router();
const { Product, Category, User } = require('../../models');
const withAuth = require('../../utils/auth');

//Display all categories
router.get('/', (req, res) => {
    Category.findAll({ })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
     })
});

//Display one category with associated products in descending order based on rating
router.get('/:id', 
// withAuth, 
(req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['category_name'],
        include: [{
            model: Product,
            attributes: ['product_name', 'size', 'price', 'rating'],
            order: [['rating', 'DESC']],  
        }],
    })
    .then(dbCategoryData => {
        if(!dbCategoryData) {
            res.status(404).json({ message: 'This category does not exist.'});
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
   
//Add new store
router.post('/', 
// withAuth, 
(req, res) => {
    Category.create({
        category_name: req.body.category_name,
        user_id: req.session.userId
        })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    });


//Update category
router.put('/:id', 
// withAuth, 
(req, res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No store found with this id'});
            return;
         }
         res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        })
});

//Delete category
router.delete('/:id', 
// withAuth, 
(req, res) => {
Category.destroy({
    where: {
        id: req.params.id
    }
})
.then(dbCategoryData => {
    if (!dbCategoryData) {
        res.status(404).json({ message: 'No store found with this id' });
        return;
    }
    res.json(dbCategoryData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
});

module.exports = router;