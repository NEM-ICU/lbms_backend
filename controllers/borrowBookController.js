import User from "../models/userModel.js";
import Book from "../models/bookModel.js";
import BorrowBook from "../models/borrowBookModel.js";

const borrowBook = async (req, res) => {
  try {
    const { isbn, userId } = req.body;

    if (!isbn || !userId) {
      throw new Error("{ userId, isbn }This fields are required.");
    }

    const user = await User.findOne({
      userId: userId,
    });

    if (!user) {
      throw new Error("No user found for the provided userId.");
    }
    const userMail = user.email;

    const existingBook = await Book.findOne({
      isbn: isbn,
    });

    if (!existingBook) {
      throw new Error("No book is registered under this ISBN code.");
    }

    const alreadyBorrowedBook = await BorrowBook.findOne({
      isbn: isbn,
    });

    if (alreadyBorrowedBook) {
      throw new Error("This book has already been taken.");
    }

    const newBorrowedbook = await BorrowBook.create({
      ...req.body,
      userMail,
    });

    res.status(200).send({
      message: "Borrowed book successfully!",
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { isbn, userId } = req.body;

    if (!isbn || !userId) {
      throw new Error("{ userId, isbn }This fields are required.");
    }

    const hasUserBorrowedBook = await BorrowBook.findOne({
      $and: [{ userId: userId }, { isbn: isbn }],
    });

    if (!hasUserBorrowedBook) {
      throw new Error("This book has not been borrowed by this user.");
    }

    const newBorrowedbook = await BorrowBook.create({
      ...req.body,
    });

    res.status(200).send({
      message: "Book return successfully!",
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

export { borrowBook, returnBook };
