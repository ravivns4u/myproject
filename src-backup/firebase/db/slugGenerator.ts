import { convertToSlug } from '../../lib/backend/slugGenerator';
import Server from '../../firebase/firebase_server_exports';
import { constDocumentRefs } from '../../firebase/constants/firestore';

export const getSlugs = async () => {
  const document = await Server.db.doc(constDocumentRefs.slugs).get();
  if (document.exists) {
    await Server.db
      .doc(constDocumentRefs.slugs)
      .set({ 'shivam-sahil': 2 }, { merge: true });
  }
  return document;
};

export const getUserSlug = async (userName: string) => {
  const slug = convertToSlug(userName);
  const document = await Server.db.doc(constDocumentRefs.slugs).get();
  const slugCount = await document.get(slug);
  if (slugCount === undefined) {
    await Server.db
      .doc(constDocumentRefs.slugs)
      .set({ [slug]: 1 }, { merge: true });
    return slug;
  } else {
    const newSlug = `${slug}-${slugCount < 10 ? `0${slugCount}` : slugCount}`;
    await Server.db
      .doc(constDocumentRefs.slugs)
      .set({ [slug]: slugCount + 1 }, { merge: true });
    return newSlug;
  }
};
