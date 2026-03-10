import { Router } from "express";
import { signIn } from "../controllers/authController";
import {
  createLoan,
  deleteLoan,
  getHealth,
  getLoanById,
  getLoans,
  updateLoan,
} from "../controllers/loanController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router: Router = Router();

router.get("/health", getHealth);
router.post("/auth/signIn", signIn);

router.get(
  "/loans",
  authenticate,
  authorize(["officer", "manager", "admin"]),
  getLoans
);

router.get(
  "/loans/:id",
  authenticate,
  authorize(["officer", "manager", "admin"]),
  getLoanById
);

router.post(
  "/loans",
  authenticate,
  authorize(["manager", "admin"]),
  createLoan
);

router.put(
  "/loans/:id",
  authenticate,
  authorize(["manager", "admin"]),
  updateLoan
);

router.delete(
  "/loans/:id",
  authenticate,
  authorize(["admin"]),
  deleteLoan
);

export default router;