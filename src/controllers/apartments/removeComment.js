const { Comment } = require("../../models");

const removeCommentId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Comment.findByIdAndRemove(id);

    if (!result) {
      throw HttpError(404, `id:${id} not found`);
    }

    res.status(200).json("comment deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = removeCommentId;
