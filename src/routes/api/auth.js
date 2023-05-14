const express = require("express");
const router = express.Router();

const {
  ctrlWrapper,
  validation,
  isValidId,
  authentication,
} = require("../../middleware");
const { user: ctrl } = require("../../controllers");
const { userJoiSchemas } = require("../../models/user");

router.post(
  "/register",
  validation(userJoiSchemas.joiUserRegisterSchema),
  ctrlWrapper(ctrl.registration)
);

router.post(
  "/login",
  validation(userJoiSchemas.joiUserLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authentication, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authentication, ctrlWrapper(ctrl.logout));

module.exports = router;
