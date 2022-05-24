const jwt = require('jsonwebtoken');

module.exports = {
    async generateToken (params = {}) {
        const token = jwt.sign(params, process.env.SECRET, { expiresIn: 2592000000 });
        return token;
    }
}
