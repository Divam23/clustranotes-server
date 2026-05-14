export const generateFilePath = (userId: string, originalName: string) => {
  const sanitized = originalName.replace(/\s+/g, '-').toLowerCase();

  return `notes/${userId}/${Date.now()}-${sanitized}`;
};
