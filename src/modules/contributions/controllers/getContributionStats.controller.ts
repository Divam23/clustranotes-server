import { ApiError } from '@/shared/utils/ApiError';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import type { Request, Response } from 'express';
import { getNoteStatusStats } from '../services/getContributionStats.service';
import { ApiResponse } from '@/shared/utils/ApiResponse';
import { mapNoteStatsStatusResponse } from '../mappers/noteStats.mapper';

const getNoteStatsController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, 'Authenticated user not found');
    }

    const stats = await getNoteStatusStats(userId);
    const mappedResponse = mapNoteStatsStatusResponse(stats);
    console.log(mappedResponse);
    return res
        .status(200)
        .json(new ApiResponse(200, mappedResponse, 'Note stats fetched successfully'));
});

export { getNoteStatsController };
