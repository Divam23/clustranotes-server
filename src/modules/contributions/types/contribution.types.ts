export interface NoteStatusStats {
    total: number;

    //Publication Lifecycle
    draft: number;
    published: number;
    archived: number;
    removed: number;

    //soft-deletion
    deleted: number;

    //Verification lifecycle
    unverified: number;
    verified: number;
    pendingReview: number;
    rejected: number;
}

export interface NoteEngagementStats {
  totalViews: number;
  totalDownloads: number;
  totalLikes: number;
  totalBookmarks: number;
  totalComments: number;
  totalShares: number;
}