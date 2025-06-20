const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path=require('path')
require('dotenv').config();

// Initialize Express
const app = express();

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const buildPath = path.join('..', 'build');

app.use(express.static(buildPath));


// console.log('Building social front', buildPath)

app.use('/uploads',express.static(path.join(__dirname, "uploads")));

app.use(cookieParser()); 
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath,'index.html'));
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000,
  socketTimeoutMS: 4500,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log("Connecting Error",err));



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
