const { Reserve, Apartment } = require("../../models");
const { HttpError } = require("../../helpers");
const reserve= async(req,res,next)=>{
  try {
    const { id: apartmentId } = req.params;
    const {owner, _id, name} = await Apartment.findById({ _id: apartmentId })

if (!owner) {
    throw HttpError(404, `id:${apartmentId} not found`);
}
await Reserve.create({
...req.body, 
apartmentId:_id,
apartmentName:name,
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