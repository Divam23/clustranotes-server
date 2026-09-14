import { INote } from '../types/note.types';

export const mapCreateNoteResponse = ({
    note
}: {
    note: INote;
}) => {

    return {
        id: note._id,
        title: note.title,
        subject: note.subject,
        course: note.course,
        fileSize: note.file.size,
        isPublic: note.isPublic,
        publishedAt: note.publishedAt,
    };
};