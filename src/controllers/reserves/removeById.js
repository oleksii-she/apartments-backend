const { Reserve } = require("../../models");
const { HttpError } = require("../../helpers");
const removeById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;

    if (!owner) {
      throw HttpError(404, "user not found");
    }

    const result = await Reserve.findById(id);

    if (String(result.owner) !== String(owner)) {
      throw HttpError(403, "No rights to view");
    }
    const resultRemove = await Reserve.findByIdAndRemove(id);

    if (!resultRemove) {
      throw HttpError(404, `id:${id} not found`);
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
