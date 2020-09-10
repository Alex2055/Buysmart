const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
class Store extends Model {}

Store.init(
    {
        //auto-incrementing store id#
        id: {
            type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        //required store name - convert to an array with option to add new name?
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            //optional street address, no validation
            street_address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            //optional city - validation? Make all lowercase for consistency?
            city: {
                type: DataTypes.STRING,
                allowNull: true
            },
            //optional state - turn into array of options?
            state: {
                type: DataTypes.STRING,
                allowNull: true
            },
            //optional zip code - can I add validation to limit to 5 numbers?
            zip: {
                type: DataTypes.STRING,
                allowNull: true
            },
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'store'
    });

module.exports = { Store };