const { Router } = require('express');
const UserController = require('../controllers/UserController');

const userRoute = Router();

userRoute.get('/', UserController.findAll);
userRoute.get('/:id', UserController.find);

module.exports = userRoute;