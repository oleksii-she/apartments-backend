
const { Reserve } = require("../../models");

const getAllReserves = async(req, res,next)=>{
try {
    const { _id: owner } = req.user;

    if (!owner) {
        throw HttpError(404, "user not found");
      }
      
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const totalPosts = await Reserve.countDocuments({ owner });

    const result = await Reserve.find({ owner })
    .skip(skip)
    .limit(limit)
    .populate("owner",);

    res.json({
        status: "success",
        data: { result,totalPosts },
      });
} catch (error) {
    next(error);
}
}

module.exports = getAllReserves;
