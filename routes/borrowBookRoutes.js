import * as borrowBook from "../controllers/borrowBookController.js";
import { Router } from "express";

const router = Router();

// borrow a book
router.post("/borrow_a_book", borrowBook.borrowBook);

// return a book
router.patch("/return_a_book", borrowBook.returnBook);

// get all books
// router.get("/get_list", borrowBook.getBorrowedBook);

// // login user route
// router.post("/login", user.loginUser);

export default router;
