import { Router } from "express";
import { calculateLoan, getLoanOptions } from "../controllers/loanController.js";

const router = Router();
router.post("/calculate", calculateLoan);
router.get("/options", getLoanOptions);
export default router;
