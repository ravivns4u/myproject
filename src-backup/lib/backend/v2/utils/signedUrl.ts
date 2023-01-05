import Server from '../../../../firebase/firebase_server_exports';
export const getSignedUrl = (imageLoc: string) =>
  Server.storage
    .bucket(process.env.FB_STORAGE_BUCKET_NAME)
    .file(imageLoc)
    .getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
    });
