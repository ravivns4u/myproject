import { constDocumentRefs } from '../../../../firebase/constants/firestore';
import Server from '../../../../firebase/firebase_server_exports';

export const addEventCategories = async (categories: string[]) => {
  if (categories === undefined || categories.length <= 0) return true;
  const categoryReg = Server.db.doc(constDocumentRefs.categories);
  await categoryReg.set({ events: categories }, { merge: true });
  return true;
};
