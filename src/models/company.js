'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    
    static associate(models) {
    }

  }
  Company.init({
    name: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    logo: DataTypes.BLOB('long')
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
  });
  return Company;
};