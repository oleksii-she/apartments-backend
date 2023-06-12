const getAll = require("./getAll");
const add = require("./add");
const getById = require("./getById");
const updateById = require("./updateById");
const apartmentRemoveById = require("./apartmentRemoveById");
const addComment = require("./addComment");
const getComments = require("./getComments");
const removeCommentId = require("./removeComment");
const updateByIdComments = require("./updateByIdComment");
const updateRating = require("./updateRating");
const addReserve = require('../reserves/addReserve')


// const getAllFilterCountry = require("./getAllFilterCountry");

module.exports = {
  getAll,
  add,
  getById,
  updateById,
  apartmentRemoveById,
  addComment,
  getComments,
  removeCommentId,
  updateByIdComments,
  updateRating,
  addReserve,

  // getAllFilterCountry,
};
