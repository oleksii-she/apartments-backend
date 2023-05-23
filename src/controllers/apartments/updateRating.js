const { Apartment } = require("../../models");
const { HttpError } = require("../../helpers");
const updateRating = async (req, res, next) => {
  try {
    console.log("asdas");
    const { id } = req.params;
    const { rating } = req.body;
    console.log(rating);
    const result = await Apartment.findByIdAndUpdate(
      id,
      { rating: rating },
      {
        new: true,
      }
    );

    if (!result) {
      throw HttpError(404, `id:${id} not found`);
    }
    res.status(200).json({ data: { result } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateRating;
