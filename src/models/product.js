'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {

      Product.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company'
      })

      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      })
      
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