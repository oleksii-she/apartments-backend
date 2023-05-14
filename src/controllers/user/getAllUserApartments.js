const { Apartment, User } = require("../../models");
const { HttpError } = require("../../helpers");
const getAllUserApartments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { _id: owner } = await User.findById(id);

    if (!owner) {
      throw HttpError(404, "user not found");
    }
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const totalPosts = await Apartment.countDocuments({ owner });

    const apatments = await Apartment.find({ owner })
      .skip(skip)
      .limit(limit)
      .populate("owner", "name email");

    const result = {
      ...apatments,
      totalPosts,
    };
    res.json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUserApartments;
