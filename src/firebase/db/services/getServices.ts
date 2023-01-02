import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';
import { IServiceTypes } from '../../../redux/interfaces/backend/apis/services';

export const getServiceByType = async (
  status: IServiceTypes,
  uid: string,
  isEvent: boolean,
  startWith: number,
  endAt: number
) => {
  const startIndex = startWith ?? 0;
  const endIndex = endAt ?? 100;
  const typeString = isEvent ? 'events-collection' : 'services-collection';
  const collectionRef = `${constDocumentRefs.merchants_meta_loc}/${status}/${uid}/${typeString}`;
  const documents = await Server.db
    .collection(collectionRef)
    .orderBy('modifiedAt', 'desc')
    .offset(startIndex)
    .limit(endIndex)
    .get();
  const services = documents.docs.map((doc) => doc.data());
  const serviceImagePromises = services.map(
    (element) =>
      new Promise((resolve) => {
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(
            isEvent
              ? `${constDocumentRefs.image_portfolio_ref_events}/${uid}/${element.serviceImageLoc}`
              : `${constDocumentRefs.image_portfolio_ref_services}/${uid}/${element.serviceImageLoc}`
          )
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          })
          .then((result) => resolve({ ...element, publicUri: result[0] }));
      })
  );
  const result = await Promise.all(serviceImagePromises);
  return result;
};
