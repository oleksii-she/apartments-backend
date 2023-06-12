const { Apartment } = require("../../models");
const { HttpError } = require("../../helpers");
const apartmentRemoveById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Apartment.findByIdAndRemove(id);

    if (!result) {
      throw HttpError(404, `id:${id} not found`);
    }

    res.status(200).json({ data: { result } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = apartmentRemoveById;
