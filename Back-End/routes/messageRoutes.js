const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const authenticate = require('../middleware/authMiddleware');


router.post('/',authenticate, sendMessage);
router.get('/:userId',authenticate, getMessages);

module.exports = router;
