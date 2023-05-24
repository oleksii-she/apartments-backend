const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { commentSchema } = require("./comment");

const ratingSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});

const apartmentSchema = Schema(
  {
    name: { type: String, required: true },
    apartmentClass: {
      type: String,
      enum: ["Economy", "Comfort", "Business", "Premium", "Lux"],
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 5,
    },
    longStayPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    ratings: [ratingSchema],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
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

const joiApartmentSchema = Joi.object({
  name: Joi.string().min(5).max(25).required(),
  apartmentClass: Joi.string().required(),
  location: Joi.string().min(4).max(20).required(),
  country: Joi.string().min(5).max(20).required(),
  address: Joi.string().min(8).max(25).required(),
  rooms: Joi.number().min(1).required(),
  price: Joi.number().min(5).required(),
  longStayPrice: Joi.number().min(3).required(),
  images: Joi.array().min(1).required(),
  description: Joi.string().min(15).max(400).required(),
  coverImage: Joi.string().required(),
  rating: Joi.number().min(0).max(5).default(0),
});

const joiRatingSchema = Joi.object({
  rating: Joi.number().min(0).max(5).default(0),
});

const Apartment = model("apartment", apartmentSchema);

module.exports = {
  Apartment,
  joiApartmentSchema,
  joiRatingSchema,
};
