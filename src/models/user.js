const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMangooseError } = require("../helpers");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\"\S+\"))@\w+([\-\.]{1}\w+)*\.\w{2,}$/;

const NumberRegex = /^(\+|\d{2})\d{9,15}$/;
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
      unique: true,
      sparse: true,
      default: '+380000000000',
      
    },
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
});

const joiUserLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(25).required(),
});

const joiGoogleLoginSchema = Joi.object({
  name: Joi.string().required("Name is required"),
  email: Joi.string().email().required("Email is required"),
  accessToken: Joi.string(),
});

const userJoiSchemas = { joiUserRegisterSchema, joiUserLoginSchema };

const User = model("user", userSchema);
console.log(User);
module.exports = {
  User,
  userJoiSchemas,
  joiGoogleLoginSchema,
};
