import { Router } from "express";
import { getInsuranceOptions, explainInsuranceTerm } from "../controllers/insuranceController.js";

const router = Router();
router.get("/options", getInsuranceOptions);
router.post("/explain", explainInsuranceTerm);
export default router;
