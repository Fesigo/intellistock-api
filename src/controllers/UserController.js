const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

class UserController {

    // Retrieve all Users from the database.
    static async findAll(req, res) {
        try {

            const users = await db.User.findAll();

            users.map(user => user.password = undefined);

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Retrieve a User by Id from the database.
    static async find(req, res) {
        try {

            const { id } = req.params;

            const user = await db.User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: `User not found! Id: ${id}` });
            }

            user.password = undefined;

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Authenticate User credentials
    static async auth(req, res) {
        try {

            const { email, password } = req.body;

            const user = await db.User.findOne({
                where: { email }
            });
            if (!user) {
                return res.status(404).json({ message: `User not found! Email: ${email}` });
            }

            if (!await bcrypt.compare(password, user.password)) {
                return res.status(403).json({ message: 'Invalid password' });
            }
            
            user.password = undefined;

            const token = await jwt.generateToken({ id: user.id });

            return res.status(200).json({ user, token });
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = UserController;
