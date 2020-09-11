const User = require ('./User');
const Product = require ('./Product');
const Store = require ('./Store');

//create associations
User.hasMany(Product, {
    foreignKey: 'user_id'
});

User.hasMany(Store, {
    foreignKey: 'user_id' 
});

Store.hasMany(Product, {
   foreignKey: 'store_id'
});

Product.belongsTo(User, {
  foreignKey: 'user_id'
});

Store.belongsTo(User, {
    foreignKey: 'user_id'
});

Product.belongsToMany(Store, {
    foreignKey: 'store_id'
});

module.exports = { User, Product, Store };