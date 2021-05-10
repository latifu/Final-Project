const { Schema, model } = require("mongoose");

const childSchema = new Schema(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      require: [true, "Parent ID of a child is required."],
    },
    firstname: {
      type: String,
      require: [true, "Child first name is required!"],
    },

    lastname: {
      type: String,
      require: [true, "Child's last name is required!"],
    },

    age: {
      type: Number,
      require: [true, "Please enter age"],
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please select gender"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Child", childSchema);
