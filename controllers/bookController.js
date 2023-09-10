// import Book from "./../models/bookModel.js";

// const createBook = async (req, res) => {
//   try {
//     const { name, isbn } = req.body;

//     if (!name || !isbn) {
//       throw new Error("This fields are required");
//     }

//     const existingBook = await Book.findOne({
//       isbn: isbn,
//     });
//     console.log("im runniiingg");

//     if (existingBook) {
//       throw new Error("Book already exists");
//     }

//     const newBook = await Book.create({
//       ...req.body,
//     });

//     res.status(200).send({
//       message: "Book created successfully!",
//     });
//   } catch (error) {
//     res.status(401).send({ message: error.message });
//   }
// };

// const getAllBooks = async (req, res) => {
//   const data = await Book.find({});
//   // console.log(data);
//   res.status(200).send({
//     books: data,
//   });
// };

// export { createBook, getAllBooks };

import Book from "./../models/bookModel.js";

const createBook = async (req, res) => {
  try {
    const { name, isbn } = req.body;

    if (!name || !isbn) {
      throw new Error("This fields are required");
    }

    const existingBook = await Book.findOne({
      isbn: isbn,
    });
    console.log("im runniiingg");

    if (existingBook) {
      throw new Error("Book already exists");
    }

    const newBook = await Book.create({
      ...req.body,
    });

    res.status(200).send({
      message: "Book created successfully!",
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  const data = await Book.find({});
  // console.log(data);
  res.status(200).send({
    books: data,
  });
};

export { createBook, getAllBooks };
