import * as borrowBook from "../controllers/borrowBookController.js";
import { Router } from "express";

const router = Router();

// borrow a book
router.post("/borrow_a_book", borrowBook.borrowBook);

// // login user route
// router.post("/login", user.loginUser);

export default router;
