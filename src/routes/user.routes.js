const { Router } = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

const userRoute = Router();

userRoute.post('/login', UserController.auth);

userRoute.use(auth);

userRoute.get('/', UserController.findAll);
userRoute.get('/:id', UserController.find);

module.exports = userRoute;
