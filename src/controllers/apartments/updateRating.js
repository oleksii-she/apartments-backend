const { Apartment } = require("../../models");
const { HttpError } = require("../../helpers");

const updateRating = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { rating } = req.body;

    const apartment = await Apartment.findById(id);
    const findUser = apartment.ratings.find(
      (el) => el.user.toString() === _id.toString()
    );
    if (findUser) {
      throw HttpError(400, `User has already rated this apartment`);
    }
    if (!apartment) {
      throw HttpError(404, `Apartment id:${id} not found`);
    }

    // Додати нову оцінку до apartment
    apartment.ratings.push({ user: req.user._id, rating });
    await apartment.save();

    // Перерахувати загальний рейтинг apartment
    const totalRatings = apartment.ratings.length;

    const sumRatings = apartment.ratings.reduce(
      (total, rating) => total + rating.rating,
      0
    );

    const averageRating = sumRatings / totalRatings;

    // Оновити рейтинг у схемі партаменту
    apartment.rating = averageRating;
    await apartment.save();

    res.status(200).json({ data: { apartment } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateRating;
