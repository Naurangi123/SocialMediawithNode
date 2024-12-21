const Thread = require('../models/Thread');
const User = require('../models/User');


exports.createThread = async (req, res) => {
  const { receiverId } = req.body;
  const sender = req.user; 

  try {

    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

    const thread = new Thread({
      participants: [sender._id, receiverId],
    });

    await thread.save();
    res.status(201).json({ message: 'Thread created successfully', thread });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find({
      participants: req.user._id,
    }).populate('participants', 'username'); 

    res.status(200).json({ threads });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Send a message in a thread
exports.sendMessage = async (req, res) => {
  const { threadId, content } = req.body;

  try {
    // Check if the user is part of the thread
    const thread = await Thread.findById(threadId);
    if (!thread || !thread.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'You are not part of this thread' });
    }

    // Create a new message
    const message = new Message({
      thread: threadId,
      sender: req.user._id,
      content,
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get messages from a thread
exports.getMessages = async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findById(threadId);
    if (!thread || !thread.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'You are not part of this thread' });
    }

    const messages = await Message.find({ thread: threadId })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
