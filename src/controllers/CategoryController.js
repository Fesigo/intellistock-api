const db = require('../models');

class CategoryController {

    // Retrieve all Categories from the database.
    static async findAll(req, res) {
        try {

            const categories = await db.Category.findAll();

            return res.status(200).json(categories);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Retrieve a Category by Id from the database.
    static async find(req, res) {
        try {

            const { id } = req.params;

            const category = await db.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: `Category not found! Id: ${id}` });
            }

            return res.status(200).json(category);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Insert a new Category into the database.
    static async create(req, res) {
        try {

            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: 'Missing Category fields' });
            }

            const category = await db.Category.create({
                name
            })

            return res.status(201).json(category);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Update a Category from the database.
    static async update(req, res) {
        try {

            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: 'Missing Category fields' });
            }

            const category = await db.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: `Category not found! Id: ${id}` });
            }

            const updatedCategory = await category.update({
                name
            })

            return res.status(201).json(updatedCategory);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = CategoryController;
