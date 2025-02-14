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
const path = require('path');
require('dotenv').config();

// MongoDB URI from environment
const mongoURI = process.env.MONGO_URI;

// Create a MongoDB connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Configure Multer to store files in memory
const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
    cb(new Error('Invalid file type'), false); 
  }
};

// Create multer upload middleware
const upload = multer({
  storage: storage, 
  limits: { fileSize: 5 * 1024 * 1024 },  
  fileFilter: fileFilter, 
});

module.exports = upload;
