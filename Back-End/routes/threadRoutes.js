const express = require('express');
const router = express.Router();
const { createThread, getThreads,sendMessage,getMessages } = require('../controllers/threadController');
const {protect} = require('../middleware/authMiddleware');

router.post('/', protect, createThread); 
router.post('/:threadId', protect, sendMessage); 
router.get('/', protect, getThreads); 
router.get('/threadId', protect, getMessages);   

module.exports = router;
