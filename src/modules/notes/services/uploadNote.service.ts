import { ApiError } from '@/shared/utils/ApiError';
import Note from '../notes.model';
import User from '../../users/models/users.model';
import { validateFile } from '@/infrastructure/storage/utils/validateFile';
import { getNoteContentType } from '@/infrastructure/storage/utils/getNoteContentType';
import { generateNoteFilePath } from '@/infrastructure/storage/utils/filePathGenerator';
import firebaseStorageProvider from '@/infrastructure/storage/providers/firebase.provider';
import { CreateNoteDto } from '../dto/createNote.dto';
import { supportedThumbnailGenerationFormats } from '@/shared/helpers/supportedFileTypeForThumbnail';
import mongoose from 'mongoose';

export const createNote = async ({
    firebaseUid,
    noteData,
    uploadedFile,
}: {
    firebaseUid: string;
    noteData: CreateNoteDto;
    uploadedFile: Express.Multer.File;
}) => {
    const user = await User.findOne({
        firebaseUid,
    }).lean();

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    console.log(noteData);
    validateFile(uploadedFile.mimetype, uploadedFile.size);

    const contentType = getNoteContentType(uploadedFile.mimetype);

    if (!contentType) {
        throw new ApiError(400, 'Unsupported file type');
    }

    const path = generateNoteFilePath(user._id.toString(), uploadedFile.originalname);

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await firebaseStorageProvider.uploadFile(uploadedFile.buffer, path, uploadedFile.mimetype);

        const note = await Note.create(
            {
                ...noteData,
                file: {
                    storagePath: path,
                    mimeType: uploadedFile.mimetype,
                    size: uploadedFile.size,
                },
                contentType,
                uploader: user._id,
            },
            
        );

        await note.save({session});

        await User.findByIdAndUpdate(
            user._id,
            {
                $inc: { 'stats.notesUploadedCount': 1 },
            },
            { session }
        );

        await note.populate(
            {   
                path: 'uploader',
                select: '_id firstName lastName userName avatar verificationStatus',
            },
        );
        await note.save({session});

        await session.commitTransaction();

        return note;
    } catch (error) {
        console.log('Note Upload Error: ', error);
        try {
            await session.abortTransaction();
        } catch (abortError) {
            console.error('Transaction abort failed:', abortError);
        }

        if (path) {
            try {
                await firebaseStorageProvider.deleteFile(path);
            } catch (cleanupError) {
                console.error('Rollback failed', cleanupError);
                throw cleanupError;
            }
        }
        console.log(error);
        throw error;
    }
    finally{
        session.endSession();
    }
};
