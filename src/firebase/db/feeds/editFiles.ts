import type { ImageFeed as ImageFeedData } from '../../../redux/interfaces/backend/apis/ImageFeed';
import { constDocumentRefs } from '../../constants/firestore';
import Server from '../../firebase_server_exports';
import type { EditPointer } from '../../../redux/interfaces/backend/apis/deleteInterfaces';
import { ServiceRequestForm } from '../../../redux/interfaces/backend/apis/servicePortfolio';

export const editMerchant = async (req: EditPointer) => {
  const { data, uid, isService } = req;
  switch (req.editOperationType) {
    case 'images': {
      return await updateImageFeed(data as ImageFeedData);
    }
    case 'services': {
      return await updateServicesPortfolio(
        data as ServiceRequestForm,
        uid,
        isService
      );
    }
    default: {
      console.log('Undefined Operation: ', req.editOperationType, data);
      return { error: true };
    }
  }
};

export const updateServicesPortfolio = async (
  data: ServiceRequestForm,
  uid: string,
  isService: boolean
) => {
  //Truncate more than 500 characters
  try {
    const truncatedText = data.serviceDescription.substring(0, 500);
    const portfolioCollection = Server.db.collection(
      `${constDocumentRefs.merchants_pending}/${uid}/${
        isService ? 'services-collection' : 'events-collection'
      }`
    );
    data.serviceDescription = truncatedText;

    await portfolioCollection
      .doc(data.serviceImageLoc)
      .set({ ...data, modifiedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (err) {
    console.log('Error happened ', err);
    return false;
  }
};

const updateImageFeed = async (data: ImageFeedData) => {
  //Truncate more than 500 characters
  try {
    const truncatedText = data.textContent.substring(0, 500);
    const feedCollection = Server.db.collection(
      `${constDocumentRefs.users_feed_image}`
    );
    data.textContent = truncatedText;
    data.modifiedAt = new Date().toISOString();
    await feedCollection.doc(data.fp).set(data, { merge: true });
    return true;
  } catch (err) {
    console.log('Error happened ', err);
    return false;
  }
};
