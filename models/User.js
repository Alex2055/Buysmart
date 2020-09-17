const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    //check password and hash using bcrypt
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
      }
    }

User.init(
    {
        //auto-incrementing user id
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    //require unique email to set up account
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    // optional password must be string, at least 8 characters - would like to require alphanumeric - also explore adding messages explaining requirements
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len: [8]
        // }
    }
    },
    {
        hooks: {
            //set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 16)
                return newUserData;
            },
            //set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 16)
              return updatedUserData;
            }
          },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
    }
);

module.exports = User;