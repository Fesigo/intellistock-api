const { Router } = require('express');
const CompanyController = require('../controllers/CompanyController');
const auth = require('../middleware/auth');
const multer = require('multer');
const { upload } = require('../config/uploadConfig');

const companyRoute = Router();
const uploadImage = multer(upload('./assets/images/companies'));

companyRoute.use(auth);

companyRoute.get('/', CompanyController.findAll);
companyRoute.get('/:id', CompanyController.find);
companyRoute.post('/', uploadImage.single('logo'), CompanyController.create);
companyRoute.put('/:id', CompanyController.update);

module.exports = companyRoute;
