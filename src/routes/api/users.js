const express = require("express");
const router = express.Router();

const {
  ctrlWrapper,
  validation,
  isValidId,
  authentication,
  upload,
} = require("../../middleware");
const { user: ctrl } = require("../../controllers/");
const { joiApartmentSchema } = require("../../models/apartment");

router.get(
  "/:id/apartments",
  authentication,
  ctrlWrapper(ctrl.getAllUserApartments)
);
router.post(
  "/",
  authentication,
  upload.fields([
    { name: "images", maxCount: 6 },
    { name: "coverImage", maxCount: 1 },
  ]),
  // validation(joiApartmentSchema),
  ctrlWrapper(ctrl.add)
);
router.get("/:id", authentication, isValidId, ctrlWrapper(ctrl.getById));
router.put(
  "/:id",
  authentication,
  isValidId,
  validation(joiApartmentSchema),

  ctrlWrapper(ctrl.updateById)
);
router.delete("/:id", authentication, isValidId, ctrlWrapper(ctrl.removeById));
// router.patch("/:id", authentication, isValidId, ctrlWrapper(ctrl.removeById));
module.exports = router;
