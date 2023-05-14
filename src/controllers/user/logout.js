const { User } = require("../../models");

const logout = async (req, res, next) => {
  try {
    console.log(req.user);
    const { _id } = req.user;
    console.log(_id);
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({ message: "Logout success" });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
