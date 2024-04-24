const Chat = require('../../models/chat');
const { HttpError } = require('../../helpers');
const getAllChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id } = req.params;

    const result = await Chat.findByIdAndUpdate(
      id,
      {
        message: message,
        edited: true,
      },
      {
        new: true,
      },
    );

    if (!result) {
      throw HttpError(404, `id:${id} not found`);
    }
    res.status(200).json({ data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllChat;
