import mongoose from "mongoose";

const Schema = mongoose.Schema;

const borrowBookSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  returned: {
    type: Boolean,
    default: false,
  },
  due_date: {
    type: Date,
    default: Date.now() + 604800000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BorrowBook = mongoose.model("BorrowBook", borrowBookSchema);

export default BorrowBook;
