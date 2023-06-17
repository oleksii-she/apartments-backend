const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMangooseError } = require("../helpers");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\"\S+\"))@\w+([\-\.]{1}\w+)*\.\w{2,}$/;

const NumberRegex = /^(\+|\d{2})\d{9,15}$/;

const userRatingSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegex,
      required: true,
    },
    phone: {
      type: String,
      default: "+380000000000",
    },
    userRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    usersRatings: [userRatingSchema],
    password: {
      type: String,
      minlength: 6,
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMangooseError);

const joiUserRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  phone: Joi.string().min(3).max(25).pattern(NumberRegex).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(25).required(),
  userRating: Joi.number().min(0).max(5).default(0),
});

const joiUserLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(25).required(),
});

const joiGoogleLoginSchema = Joi.object({
  name: Joi.string().required("Name is required"),
  email: Joi.string().email().required("Email is required"),
});

const userJoiSchemas = { joiUserRegisterSchema, joiUserLoginSchema };

const User = model("user", userSchema);

module.exports = {
  User,
  userJoiSchemas,
  joiGoogleLoginSchema,
};
