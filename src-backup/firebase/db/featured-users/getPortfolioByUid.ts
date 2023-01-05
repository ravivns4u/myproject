import Server from "../../firebase_server_exports";
import { constDocumentRefs } from "../../constants/firestore";

export const getPortfolioByUid = async (data: any) => {
  try {
    const feedRef = Server.db.collection(
      `${constDocumentRefs.users_portfolio_image}/${data.uid}`
    );
    const dataRef = await feedRef.get();
    const portfolioList = await dataRef.docs.map((doc) => doc.data());
    let portfolio:any [] = await Promise.all(portfolioList?.map(async(portfolio) => {
      return {
        ...portfolio,
        portfolioUri:  await Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(portfolio.fullPath)
          .getSignedUrl({
            version: "v4",
            action: "read",
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          }),
      };
    }));
    return { error: false, portfolio};
  } catch (err) {
    console.log("Error happened: ", err);
    return { error: true, data: { portfolio: [], uris: [] } };
  }
};
