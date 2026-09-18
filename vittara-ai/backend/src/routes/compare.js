import { Router } from "express";
import { compareOptions } from "../controllers/compareController.js";

const router = Router();
router.post("/", compareOptions);
export default router;
