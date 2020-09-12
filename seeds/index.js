
const { Product, User, Store }  = require('../models');
const sequelize = require("../config/connection")
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
        user_id: 2,
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
    }
    
];

const userData = [
    {
        email: "test@test.com",
        password: "1234abcd"
    },
    {
        email: "user@user.com",
        password: "userpw123"
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
        user_id: 2
    }
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

