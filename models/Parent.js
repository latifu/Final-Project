const { Schema, model } = require("mongoose");

const parentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required please!"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required please!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    contact: {
      type: String,
      required: [true, "Telephone number is require"],
    },
    country: {
      type: String,
      required: [true, "Please select your country"],
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Child",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Parent", parentSchema);
