const router = require('express').Router();
const { Product } = require('../../models');

router.get('/', (req, res) => {
    Product.findAll({
        
    })
})
