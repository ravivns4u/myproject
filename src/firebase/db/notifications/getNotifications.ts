import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";
import moment from 'moment';
import _ from "lodash";

export const getNotifications = async (data: any) => {
  try {
    const docuReference = Server.db
      .doc(`${constDocumentRefs.users_verified}/${data.uid}`)
    const dataRefs = await docuReference.get();
    const usrData = await dataRefs.data();
    const feedCollection = Server.db.collection(
      `${constDocumentRefs.feed_notifications}`
    )
      .where('metadata.uid', '!=', data.uid);
    const subscriptionNotify = Server.db.collection(
      `${constDocumentRefs.feed_notifications}`
    )
      .where('notification_type', '!=', 'Feed');
    const dataRef = await feedCollection.get();
    const subNotifyRef = await subscriptionNotify.get();
    const feedNotification: any[] = [];
    const visited: any = {};
    await dataRef.docs.forEach((doc) => {
      const feedData = doc.data();
      if (feedData.notification_type === 'Feed' && new Date(usrData?.createdTimeStamp) < new Date(feedData?.createdAt)) {
        feedNotification.push(feedData);
      }
    });
    const subscription: any[] = [];
    await subNotifyRef.docs.forEach((doc) => {
      const date = new Date();
      const docData = doc.data();
      const difference = moment(date).diff(moment(docData.subscriptionEndDate), 'days');
      const days = [5, 3, 2, 1, 0];
      if (docData.metadata.uid === data.uid) {
        if (days.includes(difference) && docData.notification_type === 'Subscription_End') {
          subscription.push(docData);
        } else {
          if (docData.notification_type === 'Subscription_Start') {
            subscription.push(docData);
          }
        }
      }
    })
    let notification = subscription.concat(feedNotification)


    const response = await notification.map((notification) => {
      if (!notification.users) {
        return {
          ...notification,
          seen: false,
        };
      } else {
        if (data.uid in notification.users) {
          return {
            ...notification,
            seen: true,
          };
        } else {
          return {
            ...notification,
            seen: false,
          };
        }
      }
    });

    const res: any[] = await Promise.all(
      response.map(async (notify: any) => {
        if (notify.metadata.uid && !visited[notify.metadata.uid]) {
          const documentReference = Server.db
            .doc(`${constDocumentRefs.users_verified}/${notify.metadata.uid}`)
          const dataRef = await documentReference.get();
          const userData = await dataRef.data();
          visited[notify.metadata.uid] = userData?.displayName
        }
        if (!notify.fullPath) {
          return {
            ...notify,
            metadata: {
              uid: notify.metadata.uid,
              name: visited[notify.metadata.uid]

            },
            feedUri: "",
          };
        } else {
          return {
            ...notify,
            metadata: {
              uid: notify.metadata.uid,
              name: visited[notify.metadata.uid]

            },
            feedUri: await Server.storage
              .bucket(process.env.FB_STORAGE_BUCKET_NAME)
              .file(notify.fullPath)
              .getSignedUrl({
                version: "v4",
                action: "read",
                expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
              }),
          };
        }
      })
    );

    return { error: false, notify: _.orderBy(res, 'createdAt', 'desc') };
  } catch (err) {
    console.log("Error Happned", err);
    return false;
  }
};
