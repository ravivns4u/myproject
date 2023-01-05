import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';
import { IServiceTypes } from '../../../redux/interfaces/backend/apis/services';
import { ImageInterface } from '../../../redux/interfaces/backend/apis/productPortfolio';

export const getProductByType = async (status: IServiceTypes, uid: string) => {
  try {
    const typeString = 'products-collection';
    const collectionRef = `${constDocumentRefs.merchants_meta_loc}/${status}/${uid}/${typeString}`;

    const portfolioRef = Server.db
      .collection(collectionRef)
      .orderBy('modifiedAt', 'desc');

    const dataRef = await portfolioRef.get();
    if (dataRef.empty) {
      return { error: false, data: [] };
    }
    const portfolios = await dataRef.docs.map((doc) => doc.data());

    const results: any = [];
    portfolios.forEach(async (portfolio, index) => {
      portfolio.images.map((element: ImageInterface) => {
        results.push(
          new Promise((resolve, reject) => {
            Server.storage
              .bucket(process.env.FB_STORAGE_BUCKET_NAME)
              .file(element.loc)
              .getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
              })
              .then((res) => {
                resolve({
                  preview: res[0],
                  type: element.type,
                  loc: element.loc,
                  index: index,
                });
              })
              .catch(() => reject({ error: true }));
          })
        );
      });
    });
    const response = await Promise.all(results);
    const finalResult = portfolios.map((portfolio, index) => {
      return {
        ...portfolio,
        images: response.filter((element) => element.index === index),
      };
    });

    return { error: false, data: finalResult };
  } catch (err) {
    console.log('Error 79 = ', err);
    return { error: true, data: [] };
  }
};
