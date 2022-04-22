const { Router } = require('express');
const CompanyController = require('../controllers/CompanyController');

const companyRoute = Router();

companyRoute.get('/', CompanyController.findAll);
companyRoute.get('/:id', CompanyController.find);

module.exports = companyRoute;
