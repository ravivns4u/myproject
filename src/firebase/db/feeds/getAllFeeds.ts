import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";
import { collection, query, where } from "firebase/firestore";

export const getAllFeeds = async (data:any) => {
    try {
        const feedRef = Server.db
          .collection(`${constDocumentRefs.users_feed_caption}`)
            // .where("fileType", "==", "text")
            .limit(10)
          .orderBy("createdAt", "desc");
        const dataRef = await feedRef.get();
        const caption = await dataRef.docs.map((doc) => doc.data());
        return { error: false, data: { caption} };
      } catch (err) {
        console.log("Error happened: ", err);
        return { error: true, data: { feeds: [], uris: [] } };
      }

  };