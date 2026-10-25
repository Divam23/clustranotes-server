import { NoteCategoryType } from "../constants/noteCategory.constant";
import { NoteContentType } from "../constants/noteContentType.constant";
import { NoteStatusType, NoteVerificationStatusType } from "../constants/noteStatus.constant";

export type GetNoteListOptions = {
    query?: string,
    page: number,
    limit: number,
    subject?: string,
    semester?: number;
    category?: NoteCategoryType;
    course?: string;
    noteContentType?: NoteContentType;
    notePublishStatus?: NoteStatusType;
    noteVerificationStatus?: NoteVerificationStatusType;
}