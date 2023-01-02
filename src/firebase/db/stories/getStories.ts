import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";


export const getStories = async () => {
  try {
    const feedRef = Server.db
      .collection(`${constDocumentRefs.users_stories}`)
      .orderBy("createdAt", "desc");
    const dataRef = await feedRef.get();
    const storiesList = await dataRef.docs.map((doc) => doc.data());
    const visited:any={};
    let story = await Promise.all(storiesList.map(async(story)=> {
      const documentRef =  Server.db.doc(constDocumentRefs.profile_images);
        const data =  await documentRef.get();
        const dp =  await data.get(story?.metadata.uid);

        if(story.metadata.uid && !visited[story.metadata.uid]) {
          const documentReference = Server.db
          .doc(`${constDocumentRefs.users_verified}/${story.metadata.uid}`)
          const dataRef = await documentReference.get();
          const userData = await dataRef.data();
          visited[story.metadata.uid] = userData?.displayName
        }
        if(!dp) {
          return {
            ...story,
            metadata:{
              uid: story.metadata.uid,
              name: visited[story.metadata.uid]
            },
            storiesUri:  await Server.storage
            .bucket(process.env.FB_STORAGE_BUCKET_NAME)
            .file(story.fullPath)
            .getSignedUrl({
              version: "v4",
              action: "read",
              expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            }),
            publicUri: ''
          }
        } else {
          return {
            ...story,
            metadata:{
              uid: story.metadata.uid,
              name: visited[story.metadata.uid]
            },
            storiesUri:  await Server.storage
            .bucket(process.env.FB_STORAGE_BUCKET_NAME)
            .file(story.fullPath)
            .getSignedUrl({
              version: "v4",
              action: "read",
              expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            }),
            publicUri: await Server.storage
            .bucket(process.env.FB_STORAGE_BUCKET_NAME)
            .file(dp)
            .getSignedUrl({
              version: "v4",
              action: "read",
              expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            })
          }
        }
      
    }))

    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 1);
    const stories  =  story.filter((story:any)=> currentDate.toJSON() <= story?.createdAt && story?.isDeleted === false)
    return { error: false, story: stories};
  } catch (err) {
    console.log("Error happened: ", err);
    return { error: true, data: { stories: [], uris: [] } };
  }
  };