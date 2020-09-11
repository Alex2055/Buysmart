
const  Product  = require('../models/product.js');
const sequelize = require("../config/connection")
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
        product_name: 'Starbucks' ,
        notes: 'dark roast' ,
        price: 6 ,
        rank: 4 ,
    },
    {
        store_name: 'Walmart' ,
        category: 'Coffee' ,
        product_name: 'Pitts' ,
        notes: '7oz' ,
        price: 8 ,
        rank: 3 ,
    }
    
];
const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await Product.bulkCreate(productdata);
    console.log('--------------');
}
seedAll();

