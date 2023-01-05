import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const getContactInfo = async (data: any) => {
  try {
    const feedCollection = Server.db.collection(
      `${constDocumentRefs.contact_info}/${data.uid}/user`
    );
    const dataRef = await feedCollection.get();
    let result = await dataRef.docs.map((doc) => doc.data());
    return { error: false, data: result };
  } catch (err) {
    console.log("Error Happned", err);
    return false;
  }
};
