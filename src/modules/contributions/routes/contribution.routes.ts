import { Router } from 'express';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import { requireVerifiedEmail } from '@/shared/middlewares/requireVerifiedEmail.middleware';
import { resolveCurrentUser } from '@/shared/middlewares/resolveCurrentUser.middleware';
import { getNoteStatsController } from '../controllers/getContributionStats.controller';

const router = Router();

router
    .route('/me/note-stats')
    .get(verifyFirebaseToken, requireVerifiedEmail, resolveCurrentUser, getNoteStatsController);

export default router;