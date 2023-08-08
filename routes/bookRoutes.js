import * as book from "../controllers/bookController.js";
import { Router } from "express";

const router = Router();

// create new book
router.post("/create_new_book", book.createBook);

// // login user route
// router.post("/login", user.loginUser);

export default router;
