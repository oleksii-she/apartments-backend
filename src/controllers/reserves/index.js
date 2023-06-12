const addReserve = require('../reserves/addReserve')
const getAllReserves = require('../reserves/getAllReserves')
const getByIdReserves = require('../reserves/getByIdReserves')
const removeById = require('./removeById')
const updateReadReserve = require('./updateReadReserve')
// 
// const getAllFilterCountry = require("./getAllFilterCountry");

module.exports = {
  addReserve,
  getAllReserves,
  getByIdReserves,
  removeById,
  updateReadReserve
  // getAllFilterCountry,
};
