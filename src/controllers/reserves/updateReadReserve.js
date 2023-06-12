
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

    if (result.read === true) {
       throw HttpError(409, 'read is true');
    }
if(String(result.owner) !== String(owner)){

  throw HttpError(403, "No rights to view");
}

const update = await Reserve.findByIdAndUpdate(result._id,{ read: true } , {
  new: true,
})

// console.log(result);
    res.json({
        status: "success",
        data: { update },
      });
} catch (error) {
    next(error);
}
}

module.exports = getByIdReserves;
