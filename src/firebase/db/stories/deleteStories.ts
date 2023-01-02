import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const deleteStories = async (fp:any) => {
  try {
    const feedCollection = Server.db.collection(
      `${constDocumentRefs.users_stories}`
    );

    // data.modifiedAt = new Date().toISOString();
    await feedCollection.doc(fp).update({isDeleted: true});
    return true;
  } catch (err) {
    console.log("Error happened ", err);
    return false;
  }
  };