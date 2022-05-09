const jwt = require('jsonwebtoken');

module.exports = {
    async generateToken (params = {}) {
        const token = jwt.sign(params, process.env.SECRET, { expiresIn: 36000 });
        return token;
    }
}
