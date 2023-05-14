const Joi = require("joi");
const { Schema, model } = require("mongoose");

const commentSchema = Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "apartment",
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiCommentSchema = Joi.object({
  comment: Joi.string().min(5).max(600).required(),
});

const Comment = model("comment", commentSchema);

module.exports = {
  Comment,
  joiCommentSchema,
  commentSchema,
};
