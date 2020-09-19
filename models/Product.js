const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model { }

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //moved to separate model - link through id key
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        //required field
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //optional field
        description: {
            type: DataTypes.STRING,
            allowNull: true

        },
        //optional field
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        //optional size for quantity/size qualifier
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        //should rating be included in product model? Or in a separate model and linked to user and product?
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'store',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product'
    }
);

module.exports = Product;