const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const { name: newName, phone: newPhone } = req.body;

    const newUser = {
      name: newName,
      phone: newPhone,
    };

    const existingUser = await User.findOne({ phone: newPhone });
    if (existingUser && existingUser._id.toString() !== _id) {
      throw new HttpError(400, `Phone number ${newPhone} already exists.`);
    }

    const result = await User.findByIdAndUpdate(
      _id,
      { ...newUser },
      {
        new: true,
      }
    );

    if (!newUser) {
      throw HttpError(404, `id:${id} not found`);
    }

    res.status(200).json({ data: { result } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateUser;
