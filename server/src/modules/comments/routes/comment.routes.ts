import { Router } from "express";
import { createCommentController } from "../controllers/createComment.controller";
import { getAllTopLevelCommentsController } from "../controllers/getComments.controller";
import { validate } from "@/shared/middlewares/validate.middleware";
import { createCommentSchema } from "../validators/createComment.validation";
import { getCommentsSchema } from "../validators/getComments.validation";
import { verifyFirebaseToken } from "@/shared/middlewares/verifyFirebaseToken.middleware";

const router = Router();


export default router;