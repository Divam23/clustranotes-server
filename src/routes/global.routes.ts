import {Router} from "express";
import authRoutes from "@/modules/auth/routes/auth.routes";
import userRoutes from "@/modules/users/routes/users.routes"
import noteRoutes from "@/modules/notes/notes.routes"
import bookmarkRoutes from "@/modules/bookmarks/routes/bookmark.routes"
import commentRoutes from "@/modules/comments/routes/comment.routes"
import downloadRoutes from "@/modules/downloads/routes/download.routes"
import contributionRoutes from "@/modules/contributions/routes/contribution.routes"

const router = Router();

router.use('/auth', authRoutes);
router.use('/me', userRoutes)
router.use('/note', noteRoutes)
router.use('/contribution', contributionRoutes)
router.use('/download', downloadRoutes)
router.use('/bookmark', bookmarkRoutes)
router.use('/comment', commentRoutes)


export default router;