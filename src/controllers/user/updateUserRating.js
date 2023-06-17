const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const updateUserRating = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { userRating } = req.body;

    const user = await User.findById(id);

    if (!user) {
      throw new HttpError(404, `User id:${id} not found`);
    }

    // Перевірити, чи користувач вже проголосував
    const hasVoted = user.usersRatings.some((rating) =>
      rating.user.equals(_id)
    );
    if (hasVoted) {
      throw new HttpError(400, "User has already rated");
    }

    // Оцінити користувача
    user.usersRatings.push({
      user: _id,
      userRating: Number(userRating),
    });

    // Перерахувати загальний рейтинг користувача
    const totalRatings = user.usersRatings.length;
    const sumRatings = user.usersRatings.reduce(
      (total, rating) => total + rating.userRating,
      0
    );
    const averageRating = sumRatings / totalRatings;

    // Оновити рейтинг у схемі користувача
    user.userRating = averageRating;

    await user.save();

    res.status(200).json({ data: { userRating: user.userRating } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateUserRating;
