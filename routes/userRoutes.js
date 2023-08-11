import * as user from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

// test
router.get("/test", user.test);

// register user route
router.post("/signup", user.createUser);

// login user route
router.post("/login", user.loginUser);

// profile route
router.get("/profile", user.profile);

export default router;
