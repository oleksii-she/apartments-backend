
const { Reserve } = require("../../models");
const getReserve = async(req, res,next)=>{
try {
    const { _id: owner } = req.user;
    const result = await Reserve.find({ owner });
    res.json({
        status: "success",
        data: { result },
      });
} catch (error) {
    next(error);
}
}

module.exports = getReserve;
