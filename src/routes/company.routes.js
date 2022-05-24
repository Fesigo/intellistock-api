const { Router } = require('express');
const CompanyController = require('../controllers/CompanyController');
const auth = require('../middleware/auth');
const multer = require('multer');
const { upload } = require('../config/uploadConfig');

const companyRoute = Router();
const uploadImage = multer(upload('./assets/images/companies'));

companyRoute.post('/', CompanyController.create);

companyRoute.use(auth);

companyRoute.get('/', CompanyController.findAll);
companyRoute.get('/:id', CompanyController.find);
companyRoute.put('/:id', CompanyController.update);
companyRoute.patch('/:id', uploadImage.single('logo'), CompanyController.updateLogo);

module.exports = companyRoute;
