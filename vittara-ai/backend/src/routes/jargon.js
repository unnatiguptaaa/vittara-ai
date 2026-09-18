import { Router } from "express";
import { listJargonTerms, explainJargon } from "../controllers/jargonController.js";

const router = Router();
router.get("/", listJargonTerms);
router.post("/explain", explainJargon);
export default router;
