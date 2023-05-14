const { Comment } = require("../../models");

const getComments = async (req, res, next) => {
  try {
    const { id: apartmentId } = req.params;
    const comments = await Comment.findById({ apartment: apartmentId });
    console.log("====================================");
    console.log(comments);
    console.log("====================================");
    //   const { name, phone, email, _id } = req.user;
    //   const { comment } = req.body;
    //   const result = await Comment.create({
    //     comment,
    //     apartment: apartmentId,
    //     user: { name, id: _id },
    //   });
    //   console.log(result);
    //   res.status(201).json({
    //     status: "success",
    //     data: { result },
    //   });
  } catch (error) {
    next(error);
  }
};

module.exports = getComments;
