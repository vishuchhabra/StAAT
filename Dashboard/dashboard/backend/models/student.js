const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32
    },
    roll_no : {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
      unique:true
    },
    class_name : {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    batch: {
      type: String,
      required: true,
      maxlength : 32,
      trim:true
    },
    attendance: {
      type: Array,
      default:["00000000"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", productSchema);
