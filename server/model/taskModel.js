const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    priority: {
        type: String,
        required: true,
      },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  completed:{
    type:String,
    required: false,
    default: "no"

  }     
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tasks", taskSchema);
