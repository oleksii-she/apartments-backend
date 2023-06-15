const Joi = require("joi");
const { Schema, model } = require("mongoose");

const NumberRegex = /^(\+|\d{2})\d{9,15}$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\"\S+\"))@\w+([\-\.]{1}\w+)*\.\w{2,}$/;

const ReserveSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: true,
    },
    description: {
      type: String,
    },
    apartmentId: {
      type: Schema.Types.ObjectId,
      ref: "apartment",
      required: true,
    },
    apartmentName: {
      type: Schema.Types.String,
      ref: "apartment",
      required: true,
    },
    reserved: {
      type: Schema.Types.Boolean,
      ref: "apartment",
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: Schema.Types.String,
      ref: "apartment",
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiReserveSchema = Joi.object({
  name: Joi.string().min(3).max(25).required("Name is required"),
  phone: Joi.string()
    .min(3)
    .max(25)
    .pattern(NumberRegex)
    .required("Phone is required"),
  email: Joi.string().pattern(emailRegex).required("Email is required"),
  read: Joi.boolean(),
  description: Joi.string().max(800),
  sum: Joi.number().required("Sum is required"),
  startDate: Joi.string().min(5).max(80).required("Start Date is required"),
  endDate: Joi.string().min(5).max(80).required("End Date is required"),
  numberOfDays: Joi.number().required("Number of days is required"),
});

const joiReserveReadSchema = Joi.object({
  read: Joi.boolean(),
});
const Reserve = model("reserve", ReserveSchema);

module.exports = {
  Reserve,
  joiReserveSchema,
  joiReserveReadSchema,
};
