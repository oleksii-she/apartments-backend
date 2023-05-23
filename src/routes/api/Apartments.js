const express = require("express");
const router = express.Router();

const {
  ctrlWrapper,
  validation,
  isValidId,
  authentication,
  upload,
} = require("../../middleware");
const { apartments: ctrl } = require("../../controllers/");
const { joiApartmentSchema } = require("../../models/apartment");
const { joiCommentSchema, joiRatingSchema } = require("../../models/comment");

router.get("/", ctrlWrapper(ctrl.getAll));
// router.get("/", ctrlWrapper(ctrl.getAllFilterCountry));
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
router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));
router.put(
  "/:id",
  authentication,
  isValidId,
  validation(joiApartmentSchema),

  ctrlWrapper(ctrl.updateById)
);
router.delete("/:id", authentication, isValidId, ctrlWrapper(ctrl.removeById));

router.post(
  "/:id/comments",
  authentication,
  isValidId,
  validation(joiCommentSchema),
  ctrlWrapper(ctrl.addComment)
);
router.get(
  "/:id/comments",
  authentication,
  isValidId,
  validation(joiCommentSchema),
  ctrlWrapper(ctrl.getComments)
);
router.delete(
  "/:id/comments",
  authentication,
  isValidId,
  ctrlWrapper(ctrl.removeCommentId)
);
router.put(
  "/:id/comments",
  authentication,
  isValidId,
  validation(joiCommentSchema),

  ctrlWrapper(ctrl.updateByIdComments)
);
router.put(
  "/:id/rating",
  authentication,
  isValidId,
  // validation(joiRatingSchema),
  ctrlWrapper(ctrl.updateRating)
);
// router.patch("/:id", authentication, isValidId, ctrlWrapper(ctrl.removeById));
module.exports = router;
