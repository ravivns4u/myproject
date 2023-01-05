import { db } from '../../firebase/firebase_server';
import { constDocumentRefs } from '../../firebase/constants/firestore';

export const getSlugs = async () => {
  const document = await db.doc(constDocumentRefs.slugs).get();
  if (document.exists) {
    await db
      .doc(constDocumentRefs.slugs)
      .set({ 'shivam-sahil': 2 }, { merge: true });
  }
  return document;
};
