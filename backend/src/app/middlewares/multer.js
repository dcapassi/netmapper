const multer = require('multer');
const path = require('path');
import { v4 } from "uuid";


module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..','..','uploads'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${v4()}${ext}`);
    },
  }),
};