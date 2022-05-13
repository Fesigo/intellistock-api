const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const auth = require('../middleware/auth');

const productRoute = Router();

productRoute.use(auth);

productRoute.get('/', ProductController.findAll);
productRoute.get('/company/:company_id/category/:category_id', ProductController.findByCompanyAndCategory);
productRoute.post('/company/:company_id/category/:category_id', ProductController.create);
productRoute.put('/:id/category/:category_id', ProductController.update);
productRoute.patch('/:id/updateAmount', ProductController.updateAmount);
productRoute.delete('/:id', ProductController.delete);

module.exports = productRoute;
