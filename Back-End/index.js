const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path=require('path')

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads',express.static(path.join(__dirname, "uploads")));
app.use(cookieParser()); 
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');
const commentRoutes = require('./routes/commentRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create HTTP server and setup Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Adjust as needed
    methods: ['GET', 'POST']
  }
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join room for messaging between two users
  socket.on('joinRoom', ({ senderId, receiverId }) => {
    const room = [senderId, receiverId].sort().join('_');
    socket.join(room);
    // console.log(`User joined room: ${room}`);
  });

  // Handle sending messages
  socket.on('sendMessage', ({ senderId, receiverId, content }) => {
    const room = [senderId, receiverId].sort().join('_');
    io.to(room).emit('receiveMessage', { senderId, content, createdAt: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
