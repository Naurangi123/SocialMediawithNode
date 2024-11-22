const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const {protect} = require('../middleware/authMiddleware');


router.post('/',protect, sendMessage);
router.get('/:userId',protect, getMessages);

module.exports = router;
