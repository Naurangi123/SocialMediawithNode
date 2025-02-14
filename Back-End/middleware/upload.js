// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  
//   },
//   filename: (req, file, cb) => {
//     cb(null,Date.now()+ path.extname(file.originalname)); 
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpg','image/jpeg', 'image/png', 'image/gif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type'), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, 
//   fileFilter: fileFilter
// })

// module.exports = upload;

const multer = require('multer');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
require('dotenv').config();

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', () => {
  gfs = require('gridfs-stream')(conn.db, mongoose.mongo);
  gfs.collection('uploads'); 
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: Date.now() + path.extname(file.originalname), 
        bucketName: 'uploads', 
      };
      resolve(fileInfo);
    });
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Create multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
