const multer = require('multer');
const { extname, resolve } = require('path');

module.exports = {
    upload(folder) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', folder),
                filename: (req, file, callback) => {
                    const fileName = `${Date.now() + extname(file.originalname)}`;
                    return callback(null, fileName);
                }
            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg')
                    return cb(null, true);
                else {
                    req.errorFile = 'Only .png, .jpg and .jpeg format allowed!';
                    return cb(null, false);
                }
            }
        }
    }
}