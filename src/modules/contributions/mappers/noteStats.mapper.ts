import type { NoteStatusStats } from "../types/contribution.types";

export const mapNoteStatsStatusResponse = (stats: NoteStatusStats): NoteStatusStats=>{
    return {
        total: stats.total ?? 0,

        //Publication lifecycle
        draft: stats.draft ?? 0,
        published: stats.published ?? 0,
        archived: stats.archived ?? 0,
        removed: stats.removed ?? 0,

        // Soft deletion
        deleted: stats.deleted ?? 0,

        // Verification lifecycle
        unverified: stats.unverified ?? 0,
        verified: stats.verified ?? 0,
        pendingReview: stats.pendingReview ?? 0,
        rejected: stats.rejected ?? 0,
    }
} 