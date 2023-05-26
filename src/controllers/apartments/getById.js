const { Apartment, Comment } = require("../../models");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ apartment: id });

    const result = await Apartment.findById(id).populate("ratings", "user");

    if (!result) {
      throw HttpError(404, `Apartment id:${id} not found`);
    }

    res.status(200).json({ data: { result, comments } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getById;
