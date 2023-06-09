const { Reserve, Apartment } = require("../../models");
const { HttpError } = require("../../helpers");
const reserve= async(req,res,next)=>{
  try {
    const { id: apartmentId } = req.params;
    // console.log(apartmentId);
    const {owner, _id} = await Apartment.findById({ _id: apartmentId })

if (!owner) {
    throw HttpError(404, `id:${apartmentId} not found`);
}
await Reserve.create({
...req.body, 
apartmentId:_id,
owner
})

res.status(201).json({
    status: "success",

  });
  } catch (error) {
    next(error);
  }
}

module.exports = reserve