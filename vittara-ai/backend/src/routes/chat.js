import { Router } from "express";
import { chatWithVittara } from "../controllers/chatController.js";

const router = Router();
router.post("/", chatWithVittara);
export default router;
