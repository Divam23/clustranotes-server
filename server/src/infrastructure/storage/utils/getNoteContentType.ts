import { mimeMap } from './mimeMap';

export const getNoteContentType = (
  mimeType: string
) => {

  return mimeMap[
    mimeType as keyof typeof mimeMap
  ] || null;
};