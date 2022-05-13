const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middleware/auth');

const categoryRoute = Router();

categoryRoute.use(auth);

categoryRoute.get('/', CategoryController.findAll);
categoryRoute.get('/:id', CategoryController.find);
categoryRoute.post('/', CategoryController.create);
categoryRoute.put('/:id', CategoryController.update);

module.exports = categoryRoute;
