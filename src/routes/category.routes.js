const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');

const categoryRoute = Router();

categoryRoute.get('/', CategoryController.findAll);
categoryRoute.get('/:id', CategoryController.find);
categoryRoute.post('/', CategoryController.create);
categoryRoute.put('/:id', CategoryController.update);

module.exports = categoryRoute;
