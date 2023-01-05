import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";


export const editCaption = async (data:any) => {
    try {
      const feedCollection = Server.db.collection(
        `${constDocumentRefs.users_feed_caption}`
      );
      data.modifiedAt = new Date().toISOString();
      await feedCollection.doc(data.fp).update(data)
      return true;
    } catch(err) {
      console.log("Error Happened", err);
      return false;
    }
  };