// import User from "../models/userModel.js";
// import Book from "../models/bookModel.js";
// import BorrowBook from "../models/borrowBookModel.js";

// const borrowBook = async (req, res) => {
//   try {
//     const { isbn, userId } = req.body;

//     if (!isbn || !userId) {
//       throw new Error("{ userId, isbn }This fields are required.");
//     }

//     const user = await User.findOne({
//       userId: userId,
//     });

//     if (!user) {
//       throw new Error("No user found for the provided userId.");
//     }
//     const userMail = user.email;

//     const existingBook = await Book.findOne({
//       isbn: isbn,
//     });

//     if (!existingBook) {
//       throw new Error("No book is registered under this ISBN code.");
//     }

//     const alreadyBorrowedBook = await BorrowBook.findOne({
//       isbn: isbn,
//     });

//     if (alreadyBorrowedBook) {
//       throw new Error("This book has already been taken.");
//     }

//     const newBorrowedbook = await BorrowBook.create({
//       ...req.body,
//       userMail,
//     });

//     res.status(200).send({
//       message: "Borrowed book successfully!",
//     });
//   } catch (error) {
//     res.status(401).send({ message: error.message });
//   }
// };

// const returnBook = async (req, res) => {
//   try {
//     const { isbn, userId } = req.body;

//     if (!isbn || !userId) {
//       throw new Error("{ userId, isbn }This fields are required.");
//     }

//     const hasUserBorrowedBook = await BorrowBook.findOne({
//       $and: [{ userId: userId }, { isbn: isbn }],
//     });

//     if (!hasUserBorrowedBook) {
//       throw new Error("This book has not been borrowed by this user.");
//     }

//     const newBorrowedbook = await BorrowBook.findOneAndUpdate(
//       {
//         isbn: isbn,
//       },
//       { returned: true }
//     );

//     res.status(200).send({
//       message: "Book return successfully!",
//     });
//   } catch (error) {
//     res.status(401).send({ message: error.message });
//   }
// };

// // const borrowedBooks = async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     const borrowedBooks = await BorrowBook.find({
// //       userId: id,
// //     });

// //     res.status(200).send({
// //       data: borrowedBooks,
// //     });
// //   } catch (error) {
// //     res.status(401).send({ message: error.message });
// //   }
// // };

// const calculateLateFee = (due_date) => {
//   const currentDate = new Date();
//   const dueDate = new Date(due_date);

//   const lateFeeStartDate = new Date(dueDate);
//   lateFeeStartDate.setDate(lateFeeStartDate.getDate() + 3);

//   if (currentDate <= lateFeeStartDate) {
//     return 0; // No late fee within the grace period
//   } else {
//     const timeDifference = currentDate.getTime() - lateFeeStartDate.getTime();
//     const daysLate = Math.floor(timeDifference / (1000 * 3600 * 24));
//     const lateFeePerDay = 2; // Change this to your specific late fee per day
//     const lateFee = daysLate * lateFeePerDay;
//     return lateFee;
//   }
// };

// const borrowedBooks = async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Step 1: Fetch borrowed books using userId
//     const borrowedBooks = await BorrowBook.find({
//       userId: id,
//     });

//     // Step 2: Get an array of ISBN codes from borrowedBooks
//     const isbnCodes = borrowedBooks.map((book) => book.isbn);

//     // Step 3: Fetch book data using ISBN codes from Books collection
//     const booksData = await Book.find({
//       isbn: { $in: isbnCodes }, // Using $in operator to match multiple ISBNs
//     });

//     // Step 4: Combine borrowedBooks and booksData
//     const combinedData = borrowedBooks.map((borrowedBook) => {
//       const matchingBookData = booksData.find(
//         (book) => book.isbn === borrowedBook.isbn
//       );

//       const lateFee = calculateLateFee(borrowedBook.due_date); // Calculate the late fee

//       return {
//         ...borrowedBook.toObject(),
//         bookData: matchingBookData,
//         lateFee: lateFee, // Add late fee to the response
//       };
//     });

//     // Step 5: Send the combined response
//     res.status(200).send({
//       data: combinedData,
//     });
//   } catch (error) {
//     res.status(401).send({ message: error.message });
//   }
// };

// export { borrowBook, returnBook, borrowedBooks };

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

    const newBorrowedbook = await BorrowBook.findOneAndUpdate(
      {
        isbn: isbn,
      },
      { returned: true }
    );

    res.status(200).send({
      message: "Book return successfully!",
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

// const borrowedBooks = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const borrowedBooks = await BorrowBook.find({
//       userId: id,
//     });

//     res.status(200).send({
//       data: borrowedBooks,
//     });
//   } catch (error) {
//     res.status(401).send({ message: error.message });
//   }
// };

const calculateLateFee = (due_date) => {
  const currentDate = new Date();
  const dueDate = new Date(due_date);

  const lateFeeStartDate = new Date(dueDate);
  lateFeeStartDate.setDate(lateFeeStartDate.getDate() + 3);

  if (currentDate <= lateFeeStartDate) {
    return 0; // No late fee within the grace period
  } else {
    const timeDifference = currentDate.getTime() - lateFeeStartDate.getTime();
    const daysLate = Math.floor(timeDifference / (1000 * 3600 * 24));
    const lateFeePerDay = 2; // Change this to your specific late fee per day
    const lateFee = daysLate * lateFeePerDay;
    return lateFee;
  }
};

const borrowedBooks = async (req, res) => {
  const { id } = req.params;
  try {
    // Step 1: Fetch borrowed books using userId
    const borrowedBooks = await BorrowBook.find({
      userId: id,
    });

    // Step 2: Get an array of ISBN codes from borrowedBooks
    const isbnCodes = borrowedBooks.map((book) => book.isbn);

    // Step 3: Fetch book data using ISBN codes from Books collection
    const booksData = await Book.find({
      isbn: { $in: isbnCodes }, // Using $in operator to match multiple ISBNs
    });

    // Step 4: Combine borrowedBooks and booksData
    const combinedData = borrowedBooks.map((borrowedBook) => {
      const matchingBookData = booksData.find(
        (book) => book.isbn === borrowedBook.isbn
      );

      const lateFee = calculateLateFee(borrowedBook.due_date); // Calculate the late fee

      return {
        ...borrowedBook.toObject(),
        bookData: matchingBookData,
        lateFee: lateFee, // Add late fee to the response
      };
    });

    // Step 5: Send the combined response
    res.status(200).send({
      data: combinedData,
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

export { borrowBook, returnBook, borrowedBooks };
