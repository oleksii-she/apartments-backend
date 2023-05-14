const { Apartment } = require("../../models");

const getAllUserApartments = async (req, res, next) => {
  try {
    //повертаємо квартири окремого користувача

    const { _id: owner } = req.user;
    const result = await Apartment.find({ owner });
    res.json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUserApartments;
