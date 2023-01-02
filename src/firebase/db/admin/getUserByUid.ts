import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';
export const getUserDetailsfromUID = async (uid: string) => {
  const document = await Server.db
    .doc(`${constDocumentRefs.users_verified}/${uid}`)
    .get();
  const data = document.data();
  if (!data) {
    return [];
  } else return data;
};
