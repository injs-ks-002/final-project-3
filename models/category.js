'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'User'
      })
      this.hasMany(models.Product, {
        foreignKey: 'CategoryId',
        as: 'Products'
      })
      // this.belongsTo(models.TransactionHistory, {
      //   foreignKey: 'ProductId',
      //   as: 'Products'
      // })
    }
  }
  Category.init({
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Must be filled and not empty"
        }
      }
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: "Must be an integer number"
        },
        notEmpty: {
          msg: "Must be filled and not empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true
  });
  return Category;
};