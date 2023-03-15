import express from "express";
import { register, login } from "../controllers/auth.js";
import validate from "../middleware/validation/auth.js";


const router = express.Router();
router.post("/register", validate("REGISTER"), register)
router.post("/login",validate("LOGIN"), login )

export default router;