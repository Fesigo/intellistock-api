const db = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { deleteFile } = require('../utils/file');

class CompanyController {

    // Retrieve all Companies from the database.
    static async findAll(req, res) {
        try {

            const companies = await db.Company.findAll();

            companies.map(company => company.logo = undefined);

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
                return res.status(404).json({ message: `Company not found! Id: ${id}` });
            }

            company.logo = company.logo ? Buffer.from(company.logo).toString('ascii') : null;

            return res.status(200).json(company);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Insert a new Company and User into the database.
    static async create(req, res) {
        try {

            const { user: newUser, company: newCompany } = req.body;
            const logo = req.file;

            const base64 = logo ? Buffer.from(fs.readFileSync(logo.path)).toString('base64') : null;
            if (logo) {
                deleteFile(`src/assets/images/companies/${logo.filename}`);
            }

            if (!newUser || !newUser.name || !newUser.email || !newUser.password) {
                return res.status(400).json({ message: 'Missing User fields' });
            }

            if (!newCompany || !newCompany.name || !newCompany.cnpj) {
                return res.status(400).json({ message: 'Missing Company fields' });
            }

            const hash = await bcrypt.hash(newUser.password, 12);

            const result = await db.sequelize.transaction(async t => {

                const company = await db.Company.create({
                    name: newCompany.name,
                    cnpj: newCompany.cnpj,
                    logo: base64
                }, { transaction: t });

                const user = await db.User.create({
                    name: newUser.name,
                    email: newUser.email,
                    password: hash,
                    company_id: company.id
                }, { transaction: t })

                return { company, user }

            })

            result.company.logo = undefined;
            result.user.password = undefined;

            return res.status(201).json(result);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = CompanyController;
