import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';
import type { ImagePortfolio as ImagePortfolioData } from '../../../redux/interfaces/backend/apis/ImagePortfolio';
export const updateImagePortfolio = async (
  data: ImagePortfolioData,
  modification: boolean
) => {
  console.log(data, 'Data')
  //Truncate more than 500 characters
  try {
    const truncatedText = data.textContent.substring(0, 500);
    const portfolioCollection = Server.db.collection(
      `${constDocumentRefs.users_portfolio_image}/${data.uid}`
    );
    data.textContent = truncatedText;
    !modification && (data.createdAt = new Date().toISOString());
    data.modifiedAt = new Date().toISOString();
    if(modification) {
      await portfolioCollection.doc(data.fp).update(data);
      return true;
    } else {
      await portfolioCollection.doc(data.fp).create(data);
     
      return true;
    }
    
   
  } catch (err) {
    console.log('Error happened ', err);
    return false;
  }
};

export const deleteImagePortfolio = async (data: ImagePortfolioData) => {
  const portfolioCollection = Server.db.collection(
    `${constDocumentRefs.users_portfolio_image}/${data.uid}`
  );
  try {
    await portfolioCollection.doc(data.fp).delete();
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

export const getImagePortfolios = async (uid: string) => {
  try {
    const portfolioRef = Server.db
      .collection(`${constDocumentRefs.users_portfolio_image}/${uid}`)
      .orderBy('modifiedAt', 'desc')
      .limit(30);
    const dataRef = await portfolioRef.get();
    const portfolios = await dataRef.docs.length;
    return { error: false, data: portfolios };
  } catch (err) {
    return { error: true };
  }
};

export const getImagePortfoliosByIndices = async (
  uid: string,
  startIndex: number,
  endIndex: number
) => {
  try {
    const portfolioRef = Server.db
      .collection(`${constDocumentRefs.users_portfolio_image}/${uid}`)
      // .offset(startIndex)
      // .limit(endIndex)
      .orderBy('modifiedAt', 'desc');
    const dataRef = await portfolioRef.get();
    const portfolios = await dataRef.docs.map((doc) => doc.data());
    const uriPromises: any = [];
    portfolios.forEach(async (portfolio) => {
      uriPromises.push(
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(portfolio.fullPath)
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          })
      );
    });
    const uris = await (await Promise.all(uriPromises)).map((uri) => uri[0]);

    return { error: false, data: { portfolios, uris: await uris } };
  } catch (err) {
    console.log('Error happened: ', err);
    return { error: true, data: { portfolios: [], uris: [] } };
  }
};
