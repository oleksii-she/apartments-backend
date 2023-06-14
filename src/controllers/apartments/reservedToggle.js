const { Apartment, Reserve } = require("../../models");
const { HttpError } = require("../../helpers");
const reservedToggle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reserved } = req.body;
    const result = await Apartment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    const reservedResult = await Reserve.updateMany(
      { apartmentId: id },
      { reserved: reserved }
    );

    if (!result) {
      throw HttpError(404, `id:${id} not found`);
    }
    res.status(200).json({ data: { result, reservedResult } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = reservedToggle;
