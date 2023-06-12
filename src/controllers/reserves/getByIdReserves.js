
const { Reserve } = require("../../models");
const { HttpError } = require("../../helpers");
const getByIdReserves = async(req, res,next)=>{
try {
    const { _id: owner } = req.user;
const {id} = req.params

    if (!owner) {
        throw HttpError(404, "user not found");
      }
      
 

    const result = await Reserve.findById(id)

if(String(result.owner) !== String(owner)){

  throw HttpError(403, "No rights to view");
}


// console.log(result);
    res.json({
        status: "success",
        data: { result },
      });
} catch (error) {
    next(error);
}
}

module.exports = getByIdReserves;
