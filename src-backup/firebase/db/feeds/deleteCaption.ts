import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const deleteCaption = async(data:any) => {
    const fp = data.imagePath.toString();
    try {
      const feedCollection = Server.db.collection(
        `${constDocumentRefs.users_feed_caption}`
      );
      await feedCollection.doc(fp).delete();
      return true;
    } catch(err) {
      console.log("Error Happned", err);
      return false;
    }
  }