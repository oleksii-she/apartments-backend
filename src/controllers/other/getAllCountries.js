const { Apartment } = require("../../models");

const getAllCountries = async (req, res, next) => {
  try {
    const countries = await Apartment.distinct("country");
    res.json({
      status: "success",
      data: { countries },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCountries;
