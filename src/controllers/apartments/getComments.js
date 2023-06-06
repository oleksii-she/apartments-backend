const { Comment } = require("../../models");

const getComments = async (req, res, next) => {
  try {
    const { id: apartmentId } = req.params;
 await Comment.findById({ apartment: apartmentId });

  } catch (error) {
    next(error);
  }
};

module.exports = getComments;
