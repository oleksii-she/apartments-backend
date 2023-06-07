const express = require("express");

const router = express.Router();
const passport = require("passport");
require('../../utils/authGoogle')

const {
  ctrlWrapper,
  validation,
  isValidId,
  authentication,
  isLoggedIn
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

router.post(
  "/google-auth",
  validation(userJoiSchemas.joiGoogleLoginSchema),
  ctrlWrapper(ctrl.googleLogin)
);

router.get("/current", authentication, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authentication, ctrlWrapper(ctrl.logout));

//google auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: 'https://apartments-backend.onrender.com/api/auth/google/protected',
    failureRedirect: '/auth/google/failure'
  })
);

router.get('/google/protected',isLoggedIn, ctrlWrapper(ctrl.googleLogin) );
router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});
module.exports = router;
