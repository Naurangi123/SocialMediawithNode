const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;

  try {
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });

    await message.save();
    res.status(201).json({message:message,message:"Message send Successfully"});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const receiver = await User.findById(userId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver user not found' });
    }
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 }); 
    if (messages.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No messages found between you and this user.',
        data: []
      });
    }
    res.status(200).json({
      success: true,
      message: 'Messages retrieved successfully.',
      data: messages
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
