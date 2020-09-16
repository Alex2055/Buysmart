
const { Product, User, Store }  = require('../models');
const sequelize = require("../config/connection")
const bcrypt = require('bcrypt')
const productData = [
    {
        category: 'Coffee' ,
        product_name: 'Lavazza' ,
        description: 'whole beans' ,
        size: '1 lb',
        price: 10 ,
        rating: 5 ,
        user_id: 1,
        store_id: 1
    },
    {
        category: 'Coffee' ,
        product_name: 'Starbucks' ,
        description: 'dark roast' ,
        size: '1 lb',
        price: 6 ,
        rating: 4 ,
        user_id: 1,
        store_id: 1
    },
    {
        category: 'Coffee' ,
        product_name: 'Pitts' ,
        description: 'whole bean',
        size: '7oz' ,
        price: 8 ,
        rating: 3 ,
        user_id: 1,
        store_id: 2
    },
    {
        category: 'Deli' ,
        product_name: 'Private Selection™ Old World Deli Hard Salami' ,
        description: 'Meat' ,
        size: '32 oz',
        price: 14.99 ,
        rating: 1 ,
        user_id: 1,
        store_id: 1
    },
    {
        category: 'Deli' ,
        product_name: 'Private Selection™ Wildflower Honey Ham' ,
        description: 'Meat' ,
        size: '1 lb',
        price: 8.29 ,
        rating: 2 ,
        user_id: 1,
        store_id: 1
    },
    {
        category: 'Deli' ,
        product_name: 'Boars Head Hickory Smoked Black Forest Turkey Breast' ,
        description: 'Turkey Breast' ,
        size: '1 lb',
        price: 10.99 ,
        rating: 1 ,
        user_id: 1,
        store_id: 1 
    },
    {
        category: 'Produce' ,
        product_name: 'Banana' ,
        description: 'Fruit' ,
        size: '1 lb',
        price: 0.49 ,
        rating: 2 ,
        user_id: 1,
        store_id: 1
    },
    {
        category: 'Produce' ,
        product_name: 'Strawberries' ,
        description: 'Fruit' ,
        size: '1 lb',
        price:  2.50,
        rating:  1,
        user_id: 1,
        store_id: 1
    },
    {
        category: 'Produce' ,
        product_name: 'Lettuce - Iceberg' ,
        description: 'Vegetable' ,
        size: '1 ct',
        price: 1.39 ,
        rating: 1 ,
        user_id: 1,
        store_id: 1 
    },
    {
        category: 'Produce' ,
        product_name: 'Kroger® Cut & Peeled Baby Carrots' ,
        description: 'Vegetable' ,
        size: '1 lb',
        price: 1.00 ,
        rating: 2 ,
        user_id: 1,
        store_id: 1 
    },
    {
        category: 'Produce' ,
        product_name: 'Red Bell Pepper' ,
        description: 'Vegetable' ,
        size: '1 ct',
        price: 1.69 ,
        rating: 2 ,
        user_id: 1,
        store_id: 1
    },
    {
        category: 'Deli' ,
        product_name: 'Publix Deli Salami, Hard' ,
        description: 'Meat' ,
        size: '32 oz',
        price: 15.98 ,
        rating: 2 ,
        user_id: 1,
        store_id: 2 
    },
    {
        category: 'Deli' ,
        product_name: 'Boars Head Maple Glazed Honey Coat® Ham' ,
        description: 'Meat' ,
        size: '1 lb',
        price: 11.99 ,
        rating:  2,
        user_id: 1,
        store_id: 2
    },
    {
        category: 'Deli' ,
        product_name: 'Publix Deli Smoked Turkey Breast' ,
        description: 'Meat' ,
        size: '1 lb',
        price: 8.99 ,
        rating:  1,
        user_id: 1,
        store_id: 3
    }


    
];

const userData = [
    {
        email: "test@test.com",
        password: bcrypt.hashSync("1234abcd", 16)
    }

];

const storeData = [
    {
     store_name: "Wal-Mart",
     city: "Nashville",
     state: "TN",
     zip: 37209,
     user_id: 1   
    },
    {
    store_name: "Kroger",
    city: "Nashville",
    state: "TN",
    zip: 37221,
    user_id: 1
    },
    {
        store_name: "Publix",
        city: "Nashville",
        state: "TN",
        zip: 37205,
        user_id: 1
    },
    

]
const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await User.bulkCreate(userData);
    console.log('----------------');
    await Store.bulkCreate(storeData);
    console.log('----------------');
    await Product.bulkCreate(productData);
    console.log('--------------');
}
seedAll();


