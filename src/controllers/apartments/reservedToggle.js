const { Apartment, Reserve } = require("../../models");
const { HttpError } = require("../../helpers");
const reservedToggle = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Apartment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    const result = await Reserve.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!result) {
      throw HttpError(404, `id:${id} not found`);
    }
    res.status(200).json({ data: { result } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = reservedToggle;
