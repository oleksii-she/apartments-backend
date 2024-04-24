const { User } = require('../../models');
const Chat = require('../../models/chat');
const addMessageChat = async (message, userId) => {
  try {
    // console.log(req, 'req');
    const confirmUser = await User.findById(userId);

    if (confirmUser) {
      return;
    }
    const newMessage = await Chat.create({
      message: message,
      owner: userId, // Прив'язка повідомлення до користувача за його ідентифікатором
    });
    console.log(newMessage, 'newMessage');
  } catch (error) {}
};

module.exports = addMessageChat;
