const { Comment } = require("../../models");
const { HttpError } = require("../../helpers");
const updateByIdComments = async (req, res, next) => {
  try {
    console.log("aasasas");
    const { id } = req.params;
    console.log("====================================");
    console.log(id);
    console.log("====================================");
    const result = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(result);
    if (!result) {
      throw HttpError(404, `id:${id} not found`);
    }
    res.status(200).json({ data: { result } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateByIdComments;
