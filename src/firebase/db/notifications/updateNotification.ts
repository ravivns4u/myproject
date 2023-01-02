import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const updateNotification = async (data: any) => {
  try {
    const refDoc = `${constDocumentRefs.feed_notifications}/${data.fp}`;
    const feedCollection = Server.db
      .collection(`${constDocumentRefs.feed_notifications}`)
      .where("fp", "==", data.fp);
    const dataRef = await feedCollection.get();
    let notification = await dataRef.docs.map((doc) => doc.data());
    notification.map(async (notify) => {
      notify.users[`${data.uid}`] = data.name;
      return {
        ...notify,
      };
    });
    await Server.db.doc(refDoc).update(notification[0]);
    return { error: false, notification: notification };
  } catch (err) {
    console.log("Error Happned", err);
    return false;
  }
};
