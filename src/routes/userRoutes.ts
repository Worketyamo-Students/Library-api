import { Router } from "express";
import { signupUser } from "../controllers/userController";
import { createBook } from "../controllers/bookController";
const router = Router();

router.post('/signup',signupUser);
router.post('/book',createBook);

export default router;