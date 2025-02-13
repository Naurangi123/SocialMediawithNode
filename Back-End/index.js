// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const path=require('path')
// require('dotenv').config();

// // Initialize Express
// const app = express();

// // Session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));

// // Middleware
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// const buildPath = path.join(__dirname, '..', 'socialfront', 'build');
// app.use(express.static(buildPath));
// app.use('/uploads',express.static(path.join(__dirname, "uploads")));
// app.use(cookieParser()); 
// app.use(cors());

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes');
// const threadRoutes = require('./routes/threadRoutes')


// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/threads', threadRoutes);


// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 30000,
//   socketTimeoutMS: 45000,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));



// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Set NODE_ENV for development/production
const isProduction = process.env.NODE_ENV === 'production';

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: isProduction } // Use secure cookies in production (HTTPS)
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Serve static files (React app build) in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, 'socialfront', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'socialfront', 'build', 'index.html'));
  });
} else {
  // Development behavior (e.g., running React development server)
  console.log('Running in development mode...');
}

// Routes (Example, adjust according to your routes)
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const threadRoutes = require('./routes/threadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/threads', threadRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
