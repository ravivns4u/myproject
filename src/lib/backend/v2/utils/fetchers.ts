import { constDocumentRefs } from "../../../../firebase/constants/firestore";
import Server from "../../../../firebase/firebase_server_exports";
import { ICategoryMap } from "../../../../redux/interfaces/backend/apis/v2/common";

export const fetchCategories = async () => {
  console.log("Fetching categories.....");
  try {
    console.log("888888888-------", Server.db);
    const categories = await Server.db
      .doc(`${constDocumentRefs.categories}`)
      .get();

    console.log("888888888-------", categories);
    if (categories.exists) {
      return categories.data();
    } else {
      return {};
    }
  } catch (err: any) {
    console.log("fetch categories error", err);
  }
};
