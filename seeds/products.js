
const  Product  = require('../models/product.js');

const productdata = [
    {
        store_name: 'Walmart' ,
        category: 'Coffee' ,
        product_name: 'Lavazza' ,
        notes: 'whole beans' ,
        price: 10 ,
        rank: 5 ,
    },
    {
        store_name: 'Walmart' ,
        category: 'Coffee' ,
        product_name: 'Starbaks' ,
        notes: 'dark roast' ,
        price: 6 ,
        rank: 3 ,
    },
    {
        store_name: 'Walmart' ,
        category: 'Coffee' ,
        product_name: 'Pitts' ,
        notes: '7oz' ,
        price: 8 ,
        rank: 4 ,
    }
    
];

Product.bulkCreate(productdata);

