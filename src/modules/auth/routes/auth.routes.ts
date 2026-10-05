import express from "express";
import { authenticateUserController, getCurrentUserController } from "@/modules/auth/controllers/auth.controller";
import { verifyFirebaseToken } from "@/shared/middlewares/verifyFirebaseToken.middleware";
import { requireVerifiedEmail } from "@/shared/middlewares/requireVerifiedEmail.middleware";

const router = express.Router();

router.route("/login").post(verifyFirebaseToken, authenticateUserController);

router.route("/me").get(verifyFirebaseToken, getCurrentUserController);


export default router;