import { Router } from "express";
import { uploadNote } from "./notes.controller";
import { validate } from "@/shared/middlewares/validate.middleware";
import { verifyFirebaseToken } from "@/shared/middlewares/verifyFirebaseToken.middleware";
import { noteUpload } from "@/shared/middlewares/multer.middleware";

const router = Router();

router.route("/create").post(verifyFirebaseToken, noteUpload.single("file"), uploadNote);

export default router;