import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";
import moment from 'moment'

export const getApprovedEvents = async (data: any) => {
  try {
    const categories = data.categories.sort();
    const userRef = Server.db
      .collection(`${constDocumentRefs.users_verified}`)
    const userDataRef = await userRef.get();
    const featuredUsers = await userDataRef.docs.map((doc) => doc.data());
    let featuredEvent:any[] = [];
    await Promise.all(featuredUsers.map(async user => {
      const feedRef = Server.db.collection(
        `${constDocumentRefs.merchants_verified}/${user.uid}/events-collection`
      );
      const dataRef = await feedRef.get();
      const even = await dataRef.docs.map((doc) => doc.data());
      const events = even.filter(eve => moment().diff(moment(eve?.endDate), 'days') <= 15)
      if(events.length > 0) { 
       
        const eventLists: any[] = await Promise.all(
          events.map(async (event) => {
            return {
              ...event,
              eventsUri: await Server.storage
                .bucket(process.env.FB_STORAGE_BUCKET_NAME)
                .file(event?.imageLocation)
                .getSignedUrl({
                  version: "v4",
                  action: "read",
                  expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
                }),
            };
          })
        );
        const mappedEvents = await Promise.all(eventLists.map(async (event) => {
          const documentRef = Server.db.doc(constDocumentRefs.profile_images);
          const data = await documentRef.get();
          const dp = await data.get(event.uid);
          if(dp) {
            return {
              ...event,
              score: 0,
              publicUri: await Server.storage
                .bucket(process.env.FB_STORAGE_BUCKET_NAME)
                .file(dp)
                .getSignedUrl({
                  version: "v4",
                  action: "read",
                  expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
                })
          }
          } else {
            return {
              ...event,
              score: 0,
              publicUri: ""
          }
          }
       
     
    
        }))
        featuredEvent = featuredEvent.concat(mappedEvents)
        return featuredEvent
      }
    }))

    await categories.forEach((category: any) => {
      for(let i =0; i< featuredEvent.length; i++) {
        if (featuredEvent[i]?.category?.includes(category) && featuredEvent[i].score === 0) {
          featuredEvent[i].score += 1;
        }
      }
    });

    const result = featuredEvent?.sort((a, b) => a.score - b.score).reverse();
    
    return { error: false, events: result };
  } catch (err) {
    console.log("Error happened: ", err);
    return { error: true, data: { events: [], uris: [] } };
  }
};
