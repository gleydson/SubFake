const multer = require('multer');
import path from 'path';
import crypto from 'crypto';

export default {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);
        file.key = `${hash.toString('hex')}-${file.originalname}`;
        callback(null, file.key);
      });
    },
  }),
};
