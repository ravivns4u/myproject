import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";
import type { ImageFeed as ImageFeedData } from "../../../redux/interfaces/backend/apis/ImageFeed";
export const updateImageFeed = async (
  data: ImageFeedData,
  modification: boolean
) => {
  try {
    const feedCollection = Server.db.collection(
      `${constDocumentRefs.users_feed_image}`
    );
    !modification && (data.createdAt = new Date().toISOString());
    data.modifiedAt = new Date().toISOString();
    await feedCollection.doc(data.fp).set(data, { merge: true });
    await sendNotification(data);
    return true;
  } catch (err) {
    console.log("Error happened ", err);
    return false;
  }
};

const sendNotification = async (data: any) => {
  try {
    let payload:any;
    const ts =  await new Date().getTime();
    if (data.fileType === "video" || data.fileType === "image") {
      payload = {
        notification: 'New Feed Has Been Added',
        mark_as_read: false,
        feed_uid: data.fp,
        notification_type: 'Feed',
        createdAt: new Date().toISOString(),
        fileType: data.fileType,
        fullPath: data.fullPath,
        metadata: data.metadata,
        users: {},
        fp: `notification_${ts}`

      }
    } else {
      payload = {
        notification: 'New Feed Has Been Added',
        mark_as_read: false,
        feed_uid: data.fp,
        notification_type: 'Feed',
        createdAt: new Date().toISOString(),
        fileType: data.fileType,
        metadata: data.metadata,
        users: {},
        fp: `notification_${ts}`
      }
    }
    const feedCollection =  await Server.db.collection(
      `${constDocumentRefs.feed_notifications}`
    );
  
    await feedCollection.doc(`notification_${ts}`).set(payload, { merge: true });
    return true;
  } catch (err) {
    console.log("Error happened ", err);
    return false;
  }
};

export const deleteImageFeed = async (data: ImageFeedData) => {
  const feedCollection = Server.db.collection(
    `${constDocumentRefs.users_feed_image}`
  );
  try {
    await feedCollection.doc(data.fp).delete();
    //Delete stored Image as well
    await Server.storage
      .bucket(process.env.FB_STORAGE_BUCKET_NAME)
      .file(data.fullPath)
      .delete();
    return { error: false };
  } catch (err) {
    return { error: true };
  }
};

export const getImageFeeds = async (uid: string) => {
  try {
    const feedRef = Server.db
      .collection(`${constDocumentRefs.users_feed_image}`)
      .orderBy("modifiedAt", "desc")
      .limit(30);
    const dataRef = await feedRef.get();
    const feeds = await dataRef.docs.length;
    return { error: false, data: feeds };
  } catch (err) {
    return { error: true };
  }
};

export const getImageFeedsByIndices = async (
  uid: string,
  startIndex: number,
  endIndex: number
) => {
  try {
    const feedRef = Server.db
      .collection(`${constDocumentRefs.users_feed_image}`)
      .offset(startIndex)
      .limit(endIndex)
      .orderBy("modifiedAt", "desc");
      const visited:any={};
    const dataRef = await feedRef.get();
    const feedsList = dataRef.docs.map((doc) => doc.data());
    const uriPromises: any = [];
    let newFeeds = feedsList.map(async (feed) => {
        await uriPromises.push(
          Server.storage
            .bucket(process.env.FB_STORAGE_BUCKET_NAME)
            .file(feed.fullPath)
            .getSignedUrl({
              version: "v4",
              action: "read",
              expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            })
        );
 
      const documentRef = await Server.db.doc(constDocumentRefs.profile_images);
      const data = await documentRef.get();
      const dp = await data.get(feed.metadata.uid);

            if(feed.metadata.uid && !visited[feed.metadata.uid]) {
              const documentReference = Server.db
              .doc(`${constDocumentRefs.users_verified}/${feed.metadata.uid}`)
              const dataRef = await documentReference.get();
              const userData = await dataRef.data();
              visited[feed.metadata.uid] = userData?.displayName
            }

      
      

      if(dp) {
        return {
          ...feed,
          metadata:{
            uid: feed.metadata.uid,
            name: visited[feed.metadata.uid]

          },
          feedUserUri: await Server.storage
            .bucket(process.env.FB_STORAGE_BUCKET_NAME)
            .file(dp)
            .getSignedUrl({
              version: "v4",
              action: "read",
              expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            }),
        };  
      } else {
        return {
          ...feed,
          metadata:{
            uid: feed.metadata.uid,
            name: visited[feed.metadata.uid]

          },
          feedUserUri: ''
      }
    }
    });

    const feeds = await Promise.all(newFeeds);
    const uris = (await Promise.all(uriPromises)).map((uri) => uri);
    return { error: false, data: { feeds, uris: uris } };
  } catch (err) {
    console.log("Error happened: ", err);
    return { error: true, data: { feeds: [], uris: [] } };
  }
};

export const addCaption = async (data: any) => {
  console.log(data.fp, "File Path");
  try {
    const feedCollection = Server.db.collection(
      `${constDocumentRefs.users_feed_caption}`
    );
    data.createdAt = new Date().toISOString();
    await feedCollection.doc(data.fp).set(data, { merge: true });
    return true;
  } catch (err) {
    console.log("Error happened ", err);
    return false;
  }
};
