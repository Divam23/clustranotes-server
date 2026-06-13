import { Router } from 'express';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { toggleBookmarkController } from '../controllers/toggleBookmark.controller';
import { toggleBookmarkSchema } from '../validators/toggleBookmark.validation';
import { requireVerifiedEmail } from '@/shared/middlewares/requireVerifiedEmail.middleware';

const router = Router();

router
    .route('/:targetType/:targetId')
    .post(verifyFirebaseToken, requireVerifiedEmail, validate(toggleBookmarkSchema), toggleBookmarkController);

export default router;