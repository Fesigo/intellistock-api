const db = require('../models');

class UserController {

    // Retrieve all Users from the database.
    static async findAll(req, res) {
        try {

            const users = await db.User.findAll();

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Retrieve a User by Id from the database.
    static async find(req, res) {
        try {

            const id = req.params.id;

            const user = await db.User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: `User not found! Id: ${id}` })
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = UserController;
