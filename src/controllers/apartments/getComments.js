const { Comment } = require("../../models");
const { HttpError } = require("../../helpers");

const getComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, country } = req.query;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ apartment: id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalPosts = await Comment.countDocuments({ apartment: id });
    if (!comments) {
      throw HttpError(404, `Apartment id:${id} not found`);
    }
    res.status(200).json({ data: comments, totalPosts });
  } catch (error) {
    next(error);
  }
};

module.exports = getComments;
