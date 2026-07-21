/**
 * Automatically converts Google Drive share/view links to direct rendering URLs.
 * Uses the modern Google Drive thumbnail endpoint to bypass recent 403/cookie restrictions.
 */
export const convertDriveUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  const cleanUrl = url.trim();

  // Check if it is a Google Drive link
  if (cleanUrl.includes('drive.google.com') || cleanUrl.includes('docs.google.com')) {
    let fileId = null;

    // Pattern 1: /file/d/FILE_ID/view
    const pathMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (pathMatch && pathMatch[1]) {
      fileId = pathMatch[1];
    }

    // Pattern 2: ?id=FILE_ID or &id=FILE_ID
    if (!fileId) {
      const queryMatch = cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (queryMatch && queryMatch[1]) {
        fileId = queryMatch[1];
      }
    }

    if (fileId) {
      // Modern robust method for embedding Google Drive images in <img> tags
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
    }
  }

  return cleanUrl;
};
