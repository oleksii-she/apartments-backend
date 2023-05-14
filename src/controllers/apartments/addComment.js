const { Comment } = require("../../models");

const addComment = async (req, res, next) => {
  try {
    const { id: apartmentId } = req.params;
    const { name, phone, email, _id } = req.user;
    const { comment } = req.body;

    const createdComment = await Comment.create({
      comment,
      apartment: apartmentId,
      user: { name, id: _id, email },
    });

    res.status(201).json({
      status: "success",
      data: { comment: createdComment },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addComment;
