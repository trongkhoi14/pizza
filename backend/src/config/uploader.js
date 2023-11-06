const multer = require('multer')
const path = require('path');
const slugify = require('slugify')

const MAX_FILE_SIZE = 2 * 1024 * 1024;
// Set up the multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.IMAGE_FOLDER);
    },
    filename: (req, file, cb) => {
        // To make the image filename unique, we append to the filename a timestamps
        // Because the filename save to public folder and the db is not the same, about 10 milliseconds difference
        // So we divide 10 seconds (10000 milliseconds) to make both the same filename
        cb(null, req.params.pid + '-' + file.originalname);
        //cb(null, `${Math.floor(Date.now() / 10000)}-${file.originalname}`)
        
        //cb(null, `${slug}-${date_now}.${file.mimetype.split('/')[1]}`);
    }
})
const uploader = multer({
    storage: storage,
    limits: {fileSize: MAX_FILE_SIZE},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
})

module.exports = uploader
