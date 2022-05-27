'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      this.hasMany(models.Category, {
        as: "categories",
        foreignKey: 'id'
      })
      this.hasMany(models.TransactionHistory, {
        as: "transaction",
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};