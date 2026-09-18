import { Router } from "express";
import { analyzeDocument } from "../controllers/documentController.js";

const router = Router();
router.post("/analyze", analyzeDocument);
export default router;
