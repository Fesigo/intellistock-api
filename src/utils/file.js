const fs = require('fs');

module.exports = {
    async deleteFile(filename) {
        try {
            await fs.promises.stat(filename);
        } catch (error) {
            console.log(`Error: ${error}`);
        }

        return await fs.promises.unlink(filename);
    }
}
