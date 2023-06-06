const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name: newName, phone: newPhone } = req.body;

    const existingUser = await User.findOne({ phone: newPhone });
    if (existingUser && existingUser._id.toString() !== _id) {
      throw HttpError(400, `Phone number ${newPhone} already exists.`);
    }

    const result = await User.findByIdAndUpdate(
      _id,
      { name: newName, phone: newPhone },
      { new: true }
    );

    if (!result) {
      throw HttpError(404, `User with id:${_id} not found`);
    }

    res.status(200).json({ data: { result } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateUser;
