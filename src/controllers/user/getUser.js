const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, name, userRating, usersRatings } = await User.findById(id);

    if (!email) {
      throw HttpError(404, `User with id:${_id} not found`);
    }

    res.status(200).json({ data: { email, name, userRating, usersRatings } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getUser;
