const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
class Product extends Model {}
Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        store_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        notes: {
            type: DataTypes.STRING,
            allowNull: false

        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
    },
    {
        sequelize
    }
        
);
module.exports = Product;