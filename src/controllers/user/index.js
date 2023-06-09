const registration = require("./registration");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const getAllUserApartments = require("./getAllUserApartments");
const updateUser = require("./updeteUser");
const googleLogin = require("./googleLogin");
const getReserve = require('./getReserve')
module.exports = {
  registration,
  login,
  getCurrent,
  logout,
  getAllUserApartments,
  updateUser,
  googleLogin,
  getReserve
};
