import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const ndaFormSinged = async (data: any) => {
  try {
    const fp = `${constDocumentRefs.users_verified}`
      const feedCollection = Server.db.collection(fp);
      data.modifiedAt = new Date().toISOString();
      await feedCollection.doc(data.uid).update({ndaSigned: data.ndaSigned});
      return true;
  } catch (err) {
    return false;
  }
};
