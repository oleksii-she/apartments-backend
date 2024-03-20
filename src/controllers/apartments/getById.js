const { ObjectId } = require('mongodb');
const { Apartment, Comment, User } = require("../../models");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ apartment: id });

    const result = await Apartment.findById(id).populate(
      "ratings",
      "user userRating"
    );

    if (!result) {
      throw HttpError(404, `Apartment id:${id} not found`);
    }


    const ownerId = new ObjectId(result.owner).toString()
    const userData = await User.findById(ownerId)

    if (!userData) {
      throw HttpError(404, `Apartment id:${id} not found`);
    }
    const user = {
      user: userData.name,
      phone: userData.phone,
      email: userData.email,
      userRating: userData.userRating,
      usersRatings: userData.usersRatings,
    }

    res.status(200).json({ data: { result,user, comments } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getById;
