const { Apartment } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, country } = req.query;

    const skip = (page - 1) * limit;

    let totalPosts;

    let apartments;

    if (country === "undefined" || country === "null") {
      totalPosts = await Apartment.countDocuments();
      apartments = await Apartment.find()
        .skip(skip)
        .limit(limit)
        .populate("owner", "name email ratings userRating")
        .sort({ createdAt: -1 });
    } else {
      totalPosts = await Apartment.countDocuments({ country: country });
      apartments = await Apartment.find({ country: country });
    }

    const result = {
      apartments: apartments,
      totalPosts,
    };
    res.json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
