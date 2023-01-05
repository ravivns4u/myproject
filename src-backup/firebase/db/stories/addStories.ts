import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";


export const addStories = async (data:any) => {
  try {
    const feedCollection = Server.db.collection(
      `${constDocumentRefs.users_stories}`
    );

    data.createdAt = new Date().toISOString();
    await feedCollection.doc(data.fp).set(data, { merge: true });
    return true;
  } catch (err) {
    console.log("Error happened ", err);
    return false;
  }
  };