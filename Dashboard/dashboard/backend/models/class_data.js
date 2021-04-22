const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    count : {
      type: Number,
      default :0
    },
    batch : {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("class_schema", classSchema);
