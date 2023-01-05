import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const getComments = async () => {
    try {
        const feedRef = Server.db
          .collection(`${constDocumentRefs.user_comments}`)
        const dataRef = await feedRef.get();
        const comments = await dataRef.docs.map((doc) => doc.data());
        const visited:any={};
        let commentsList:any[] = await Promise.all(comments?.map(async (comment)=> {
          if(comment.metadata.uid && !visited[comment.metadata.uid]) {
            const documentReference = Server.db
            .doc(`${constDocumentRefs.users_verified}/${comment.metadata.uid}`)
            const dataRef = await documentReference.get();
            const userData = await dataRef.data();
            visited[comment.metadata.uid] = userData?.displayName
          }

        const documentRef =  Server.db.doc(constDocumentRefs.profile_images);
        const data =  await documentRef.get();
        const dp =  await data.get(comment.metadata.uid);
          return {
            ...comment,
            metadata:{
              uid: comment.metadata.uid,
              name: visited[comment.metadata.uid]
  
            },
            publicUri:  dp && await Server.storage
            .bucket(process.env.FB_STORAGE_BUCKET_NAME)
            .file(dp)
            .getSignedUrl({
              version: "v4",
              action: "read",
              expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            })
          }
        }));
        return { error: false, comments: commentsList};
      } catch (err) {
        console.log("Error happened: ", err);
        return { error: true, data: { comments: [], uris: [] } };
      }
  };