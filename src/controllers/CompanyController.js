const db = require('../models');

class CompanyController {

    // Retrieve all Companies from the database.
    static async findAll(req, res) {
        try {

            const companies = await db.Company.findAll();

            return res.status(200).json(companies);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Retrieve a Company by Id from the database.
    static async find(req, res) {
        try {

            const id = req.params.id;

            const company = await db.Company.findByPk(id);
            if (!company) {
                return res.status(404).json({ message: `Company not found! Id: ${id}` })
            }

            return res.status(200).json(company);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = CompanyController;
