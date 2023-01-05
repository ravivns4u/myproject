import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';

export const updateProfileImage = async (uid: string, imagePath: string) => {
  const doc = Server.db.doc(constDocumentRefs.profile_images);
  await doc.set({ [uid]: imagePath }, { merge: true });
  return true;
};

export const getProfileImage = async (uid: string) => {
  const doc = Server.db.doc(constDocumentRefs.profile_images);
  const docSnapshot = await doc.get();
  const data = docSnapshot.data();
  if (!data) return 'invalid-url';
  return data[uid] ?? 'invalid-url';
};
