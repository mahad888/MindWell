import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Types.ObjectId,
      ref: "Patient",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Chat =mongoose.models.Chat || model("Chat", schema);