const User = require ('./User');
const Product = require ('./Product');
const Store = require ('./Store');
const Category = require ('./Category');

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

Product.belongsTo(Store, {
    foreignKey: 'store_id'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

Category.hasMany(Product, {
    foreignKey: 'category_id'
});

User.hasMany(Category, {
    foreignKey: 'user_id'
});

Category.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Product, Store, Category };