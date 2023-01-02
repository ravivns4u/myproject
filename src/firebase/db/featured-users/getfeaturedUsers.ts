import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const getfeaturedUsers = async (data: any) => {
  data.categories.sort();
  try {
    const feedRef = Server.db
      .collection(`${constDocumentRefs.users_verified}`)
      .where("accountType", "==", "Individual")
      .where("adminApproval", "==", "verified");
    const dataRef = await feedRef.get();
    const featuredUsers = await dataRef.docs.map((doc) => doc.data());
    await featuredUsers.map((users) => {
      users.score = 0;
    });
    await data.categories.forEach((category: any) => {
      featuredUsers.map((users) => {
        if (users?.categories?.includes(category)) {
          users.score += 1;
        }
        return users;
      });
    });

    const result = await featuredUsers
      .sort((a, b) => a.score - b.score)
      .reverse();

    const userLists: any[] = await Promise.all(result?.map(async (user) => {
      const documentRef = await Server.db.doc(constDocumentRefs.profile_images);
      const data = await documentRef.get();
      const dp = await data.get(user?.uid);
      if (dp === undefined) {
        return {
          ...user,
          publicUri: "",
        };
      } else {
        return {
          ...user,
          publicUri: await Server.storage
            .bucket(process.env.FB_STORAGE_BUCKET_NAME)
            .file(dp)
            .getSignedUrl({
              version: "v4",
              action: "read",
              expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            }),
        };
      }
    }));
    return { error: false, featuredUsers: userLists};
  } catch (err) {
    console.log("Error happened: ", err);
    return { error: true, data: { featuredUsers: [], uris: [] } };
  }
};
