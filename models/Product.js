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
        //required field - would like to change to an array but need to figure out how...
        category: {
            type: DataTypes.STRING,
            allowNull: false
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
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        //removing rank for now - maybe add later as separate model
        // rank: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        
    // },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product'
    }    
);
module.exports = Product;