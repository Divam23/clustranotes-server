export const mimeMap = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'text/plain': 'txt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'image/jpeg': 'image',
  'image/png': 'image',
} as const;

export const avatarMimeMap = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/jpg': 'image',
  "image/heic": 'image',
  "image/heif": 'image',
};
