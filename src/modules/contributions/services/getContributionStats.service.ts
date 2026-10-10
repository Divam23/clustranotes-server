import Note from '@/modules/notes/notes.model';
import { NoteStatusStats } from '../types/contribution.types';
import mongoose from 'mongoose';

// export const getUserContributionStats = async (firebaseUid: string) => {
//     const user = await User.findOne({ firebaseUid }).lean();
//     if (!user) {
//         throw new ApiError(404, 'User not found');
//     }

//     await user.populate(``);
// };







export const getNoteStatusStats = async (userId: mongoose.Types.ObjectId) => {

    const activeNote = {
        $and:[
            {$ne:['$moderation.isDeleted', true]},
            {$ne:['$notePublishStatus', 'removed']}
        ]
    }

    const eligibleForVerification = {
        $and:[
            activeNote,
            {
                $in:['$notePublishStatus', ['published', 'archived']]
            }
        ]
    }

    const [stats] = await Note.aggregate<NoteStatusStats>([
        {
            $match: {
                uploader: userId,
            },
        },
        
        {
            $group: {
                _id: null,

                total: { $sum: 1 },

                deleted: {
                    $sum: {
                        $cond: [
                            { 
                                $and:[
                                    {$eq: ['$moderation.isDeleted', true]},
                                    {$ne: ['$notePublishStatus',"removed"]} 
                                ]
                            },
                            1,
                            0
                        ],
                    },
                },
                draft: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    activeNote,
                                    { eq: ['$notePublishStatus', 'draft'] },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
                published: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    activeNote,
                                    {$ne:['$notePublishStatus', 'unverified']},
                                    { $eq: ['$notePublishStatus', 'published'] },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },

                archived: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    activeNote,
                                    { $eq: ['$notePublishStatus', 'archived'] },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },

                removed: {
                    $sum: {
                        $cond: [{ $eq: ['$notePublishStatus', 'removed'] }, 1, 0],
                    },
                },

                unverified: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    eligibleForVerification,
                                    { $eq: ['$noteVerificationStatus', 'unverified'] },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },

                verified: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    eligibleForVerification,
                                    { $eq: ['$noteVerificationStatus', 'verified'] },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },

                pendingReview: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    eligibleForVerification,
                                    { $eq: ['$noteVerificationStatus', 'pending_review'] },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },

                rejected: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    eligibleForVerification,
                                    { $eq: ['$noteVerificationStatus', 'rejected'] },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                total: 1,
                draft: 1,
                published: 1,
                archived: 1,
                removed: 1,
                deleted: 1,
                unverified: 1,
                pendingReview: 1,
                verified: 1,
                rejected: 1,
            },
        },
    ]);

    return (
        stats ?? {
            total: 0,
            draft: 0,
            published: 0,
            archived: 0,
            removed: 0,
            deleted: 0,
            unverified: 0,
            pendingReview: 0,
            verified: 0,
            rejected: 0,
        }
    );
};
