const Chat = require('../../models/chat');

const getAllChat = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const allChat = await Chat.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalPosts = await Chat.countDocuments();

    res.json({
      status: 'success',
      data: { result: allChat, totalPosts },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllChat;
