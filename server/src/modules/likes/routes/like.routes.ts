import { Router } from 'express';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { toggleLikeController } from '../controllers/toggleLike.controller';
import { toggleLikeSchema } from '../validators/toggleLike.validation';

const router = Router();

router
    .route('/:targetType/:targetId')
    .post(verifyFirebaseToken, validate(toggleLikeSchema), toggleLikeController);
