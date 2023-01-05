import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const editContactInfo = async (data: any) => {
  console.log(data, 'Data')
  try {
    if (!data.fp) {
      const ts = new Date().getTime();
      const feedCollection = Server.db.collection(
        `${constDocumentRefs.contact_info}/${data.uid}/user`
      );
      data.createdAt = new Date().toISOString();
      data.fp = `contact_info_${ts}`;
      await feedCollection.doc(data.fp).set(data, { merge: true });
      return true;
    } else {
      const feedCollection = Server.db.collection(
        `${constDocumentRefs.contact_info}/${data.uid}/user`
      );
      data.modifiedAt = new Date().toISOString();
      await feedCollection.doc(data.fp).update(data, { merge: true });
      return true;
    }
  } catch (err) {
    console.log("Error happened ", err);
    return false;
  }
};
