import express from "express";
import { home, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", home);
router.post("/update/:id", verifyToken, updateUser);
export default router;
