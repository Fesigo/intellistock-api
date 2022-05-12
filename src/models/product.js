'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      
    }

  }
  Product.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  });
  return Product;
};