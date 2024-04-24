const express = require('express');
const router = express.Router();
const { chat: ctrl } = require('../../controllers');
const {
  ctrlWrapper,
  validation,
  isValidId,
  authentication,
  upload,
} = require('../../middleware');
router.get('/', authentication, ctrlWrapper(ctrl.getChatMessage));
router.patch(
  '/:id',
  authentication,
  isValidId,

  ctrlWrapper(ctrl.updateChatId),
);
module.exports = router;
