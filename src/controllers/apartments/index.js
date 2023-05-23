const getAll = require("./getAll");
const add = require("./add");
const getById = require("./getById");
const updateById = require("./updateById");
const removeById = require("./removeById");
const addComment = require("./addComment");
const getComments = require("./getComments");
const removeCommentId = require("./removeComment");
const updateByIdComments = require("./updateByIdComment");
const updateRating = require("./updateRating");
// const getAllFilterCountry = require("./getAllFilterCountry");

module.exports = {
  getAll,
  add,
  getById,
  updateById,
  removeById,
  addComment,
  getComments,
  removeCommentId,
  updateByIdComments,
  updateRating,
  // getAllFilterCountry,
};
