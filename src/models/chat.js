const Joi = require('joi');
const { Schema, model } = require('mongoose');

const chatSchema = Schema(
  {
    message: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    socketID: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Chat = model('chats', chatSchema);

module.exports = Chat;
