import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const updateLikes = async (data: any) => {
  try {
    const refDoc = `${constDocumentRefs.users_feed_image}/${data.fp}`
    const feedRef = Server.db.collection(constDocumentRefs.users_feed_image);
    const dataRef = await feedRef.get();
    const feeds = await dataRef.docs.map((doc) => doc.data());
    await Promise.all(feeds.map(async(feed) => {
      if (feed.fp === data.fp) {
        if (data.liked_users.uid in feed.liked_users) {
          feed.liked_count -= 1;
          await delete feed.liked_users[`${data.liked_users.uid}`];
          await Server.db.doc(refDoc).update(feed);
        } else {
          feed.liked_count += 1;
          feed.liked_users[`${data.liked_users.uid}`] = data.liked_users.name;
          await Server.db.doc(refDoc).update(feed);
        }
      }
    }));
    return { error: false, data: { feeds } };
  } catch (err) {
    console.log("Error happened ", err);
    return false;
  }
};
