const express = require("express");
const router = express.Router();

const {
  ctrlWrapper,
  validation,
  isValidId,
  authentication,
  upload,
} = require("../../middleware");
const { reserves: ctrl } = require("../../controllers");
const { joiApartmentSchema } = require("../../models/apartment");
const { joiCommentSchema, joiRatingSchema } = require("../../models/comment");
const {joiReserveSchema, joiReserveReadSchema} = require('../../models/reserve')




router.get(
  "/",
  authentication,
  ctrlWrapper(ctrl.getAllReserves)
);

router.get(
  "/:id",
  authentication,
  isValidId,
  ctrlWrapper(ctrl.getByIdReserves)
);

router.post(
  "/:id",
  isValidId,
  validation(joiReserveSchema),
  ctrlWrapper(ctrl.addReserve)
);


router.patch(
  "/:id",
  isValidId,
  authentication,
  validation(joiReserveReadSchema),
  ctrlWrapper(ctrl.updateReadReserve)
);


router.delete(
  "/:id",
  isValidId,
  authentication,
  validation(joiReserveSchema),
  ctrlWrapper(ctrl.removeById)
);

module.exports = router;
