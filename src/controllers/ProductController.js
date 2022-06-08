const db = require('../models');

class ProductController {

    // Retrieve all Products from the database.
    static async findAll(req, res) {
        try {

            const products = await db.Product.findAll();

            return res.status(200).json(products);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Retrieve a Product by Id from the database.
    static async find(req, res) {
        try {

            const { id } = req.params;

            const product = await db.Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: `Product not found! Id: ${id}` });
            }

            return res.status(200).json(product);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Retrieve a Product by Company Id from the database.
    static async findByCompany(req, res) {
        try {

            const { company_id } = req.params;

            const company = await db.Company.findOne({
                where: { id: company_id },
                attributes: ['id', 'name'],
                include: [
                    {
                        model: db.Product,
                        as: 'products',
                        attributes: ['id', 'name', 'company_id']
                    }
                ]
            });
            if (!company) {
                return res.status(404).json({ message: `Company not found! Id: ${company_id}` });
            }

            return res.status(200).json(company);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Retrieve a Product by Company Id and Category Id from the database.
    static async findByCompanyAndCategory(req, res) {
        try {

            const { category_id, company_id } = req.params;

            const company = await db.Company.findByPk(company_id);
            if (!company) {
                return res.status(404).json({ message: `Company not found! Id: ${company_id}` });
            }

            const category = await db.Category.findOne({
                where: { id: category_id },
                attributes: ['id', 'name'],
                include: [
                    {
                        model: db.Product,
                        as: 'products',
                        where: { company_id },
                        required: false,
                        attributes: ['id', 'name', 'company_id'],
                    }
                ]
            });
            if (!category) {
                return res.status(404).json({ message: `Category not found! Id: ${category_id}` });
            }

            return res.status(200).json(category);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Insert a new Product into the database.
    static async create(req, res) {
        try {

            const { category_id, company_id } = req.params;
            const { name, amount } = req.body;

            if (!name || !amount) {
                return res.status(400).json({ message: 'Missing Product fields' });
            }

            const category = await db.Category.findByPk(category_id);
            if (!category) {
                return res.status(404).json({ message: `Category not found! Id: ${category_id}` });
            }

            const company = await db.Company.findByPk(company_id);
            if (!company) {
                return res.status(404).json({ message: `Company not found! Id: ${company_id}` });
            }

            const product = await db.Product.create({
                name,
                amount,
                category_id,
                company_id
            })

            return res.status(201).json(product);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Update a Product from the database.
    static async update(req, res) {
        try {

            const { id, category_id } = req.params;
            const { name, amount } = req.body;

            const product = await db.Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: `Product not found! Id: ${id}` });
            }

            const category = await db.Category.findByPk(category_id);
            if (!category) {
                return res.status(404).json({ message: `Category not found! Id: ${category_id}` });
            }

            await product.update({
                name,
                amount,
                category_id
            })

            return res.status(200).json(product);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Update a Product's amount attribtue.
    static async updateAmount(req, res) {
        try {

            const { id } = req.params;
            const { amount } = req.body;

            const product = await db.Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: `Product not found! Id: ${id}` });
            }

            await product.update({
                amount
            })

            return res.status(200).json(product);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Delete a Product from the database.
    static async delete(req, res) {
        try {

            const { id } = req.params;

            const product = await db.Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: `Product not found! Id: ${id}` });
            }

            await product.destroy();

            return res.status(204).json();
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = ProductController;
