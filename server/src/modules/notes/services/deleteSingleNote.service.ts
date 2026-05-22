import Note from '../notes.model';
import User from '@/modules/users/models/users.model';
import { ApiError } from '@/shared/utils/ApiError';
import firebaseStorageProvider from '@/infrastructure/storage/providers/firebase.provider';

export const deleteSingleNote = async (firebaseUid: string, noteId: string) => {
    const user = await User.findOne({firebaseUid}).lean();

    if (!user) {
        throw new ApiError(401, 'Unauthorized User');
    }

    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(404, 'No note found');
    }

    // ownership validation
    if (note.uploader.toString() !== user._id.toString()) {
        throw new ApiError(403, 'You cannot delete this note');
    }


    if (note.file?.url) {
        await firebaseStorageProvider.deleteFile(note.file.url);
    }

    await Note.findByIdAndDelete(noteId);

    return {
        deleted:true,
        noteId
    };
};
