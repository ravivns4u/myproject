import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';
import type {
  ServiceRequestForm,
  ServicePortfolio,
} from '../../../redux/interfaces/backend/apis/servicePortfolio';
import { IServiceTypes } from '../../../redux/interfaces/backend/apis/services';
import { fetchCategories } from '../../../lib/backend/v2/utils/fetchers';
import {
  getCitiesAndStates,
  getStateFromCity,
} from '../../../lib/backend/getCities';

const categories = fetchCategories().then((data) => data);
const { cities } = getCitiesAndStates();

export const updateServicePortfolio = async (
  data: ServiceRequestForm,
  modification: boolean,
  uid: string,
  isService: boolean,
  name: string,
  dpLoc: string
): Promise<{ valid: boolean; message: string }> => {
  //Truncate more than 500 characters
  try {
    const collectionName = isService
      ? 'services-collection'
      : 'events-collection';
    const pdDoc = `${constDocumentRefs.merchants_pending}/${uid}/${collectionName}/${data.serviceImageLoc}`;
    const rjDoc = `${constDocumentRefs.merchants_rejected}/${uid}/${collectionName}/${data.serviceImageLoc}`;
    const vfDoc = `${constDocumentRefs.merchants_verified}/${uid}/${collectionName}/${data.serviceImageLoc}`;
    let initialCollection = pdDoc;
    if (modification) {
      const pendingDoc = await Server.db.doc(pdDoc).get();
      if (!pendingDoc.exists) {
        const rejectedDoc = await Server.db.doc(rjDoc).get();
        if (rejectedDoc.exists) {
          initialCollection = rjDoc;
        } else {
          const approvedDoc = await Server.db.doc(vfDoc).get();
          if (approvedDoc.exists) {
            initialCollection = vfDoc;
          } else {
            console.log('Returning false');
            return {
              valid: false,
              message: 'No Record Found to Perform Modification',
            };
          }
        }
      }
    }
    const result = await checkServiceValidity(
      data,
      initialCollection,
      uid,
      name,
      dpLoc,
      modification,
      'User'
    );
    if (!result.valid) {
      return { valid: false, message: result.message };
    }
    await Server.db.doc(initialCollection).set(result.data, { merge: true });

    return { valid: true, message: '' };
  } catch (err) {
    console.log('Error happened ', err);
    return { valid: false, message: 'Internal Server Error Happened' };
  }
};

export const getServiceOrEventsByPendingByIndices = async (
  uid: string,
  startIndex: number,
  endIndex: number,
  isEvent: boolean
) => {
  try {
    const portfolioRef = Server.db
      .collection(
        `${constDocumentRefs.merchants_pending}/${uid}/${
          isEvent ? 'events-collection' : 'services-collection'
        }`
      )
      .orderBy('modifiedAt', 'desc');

    const dataRef = await portfolioRef.get();
    const portfolios = await dataRef.docs
      .slice(startIndex, endIndex)
      .map((doc) => doc.data());
    const uriPromises: any = [];

    portfolios.forEach(async (portfolio) => {
      uriPromises.push(
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(
            isEvent
              ? `${constDocumentRefs.image_portfolio_ref_events}/${uid}/${portfolio.serviceImageLoc}`
              : `${constDocumentRefs.image_portfolio_ref_services}/${uid}/${portfolio.serviceImageLoc}`
          )
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
    return { error: true, data: { portfolios: [], uris: [] } };
  }
};

export const getServiceOrEventsByIndices = async (
  uid: string,
  status: IServiceTypes,
  startIndex: number,
  endIndex: number,
  isEvent: boolean
) => {
  const docRefAddress =
    status === 'verified'
      ? constDocumentRefs.merchants_verified
      : status === 'pending'
      ? constDocumentRefs.merchants_pending
      : constDocumentRefs.merchants_rejected;
  try {
    const portfolioRef = Server.db
      .collection(
        `${docRefAddress}/${uid}/${
          isEvent ? 'events-collection' : 'services-collection'
        }`
      )
      .orderBy('modifiedAt', 'desc');

    const dataRef = await portfolioRef.get();
    const portfolios = await dataRef.docs
      .slice(startIndex, endIndex)
      .map((doc) => doc.data());
    const uriPromises: any = [];

    portfolios.forEach(async (portfolio) => {
      uriPromises.push(
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(
            isEvent
              ? `${constDocumentRefs.image_portfolio_ref_events}/${uid}/${portfolio.serviceImageLoc}`
              : `${constDocumentRefs.image_portfolio_ref_services}/${uid}/${portfolio.serviceImageLoc}`
          )
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
    return { error: true, data: { portfolios: [], uris: [] } };
  }
};

export const checkServiceValidity = async (
  data: ServiceRequestForm,
  id: string,
  user_uid: string,
  user_name: string,
  user_dp_loc: string,
  modification: boolean,
  modifiedBy: 'User' | 'Admin'
): Promise<{ valid: boolean; message: string; data: ServicePortfolio }> => {
  /*
      #. Check if Service Name is EmptySpace
      #. Check if City belongs to the Existing Categories
      #. Verify Duration for Genres
      #. Check if MaxCapacity is not -1.

      #. Assign State from City

  */
  const uploadContent: ServicePortfolio = {
    id,
    serviceName: data.serviceName,
    category: data.category,
    serviceDescription: data.serviceDescription.substring(0, 500),
    serviceState: data.serviceState,
    serviceCity: data.serviceCity,
    servicePricing: data.servicePricing,
    serviceImageLoc: data.serviceImageLoc,
    serviceFileType: data.serviceFileType,
    serviceGender: data.serviceGender,
    currency: data.currency,
    modifiedAt: new Date().toISOString(),
    lastModifiedBy: modifiedBy,
    imageStorageLoadPath: '',
    absImagePath: data.absImagePath,
    serviceSubscription: {
      requested: [] as string[],
      approved: [] as string[],
      approvedByAdmin: [] as string[],
      rejected: [] as string[],
    },
    creator_uid: user_uid,
    creator_name: user_name,
    creator_dp_loc: user_dp_loc,
    serviceLanguage: data.serviceLanguage,
    profession: data.profession,
    panIndia: data.panIndia ?? false,
  };

  console.log(uploadContent, 'Upload Content')

  if (uploadContent.serviceName.length === 0) {
    return {
      valid: false,
      message: 'Service Name is Empty',
      data: uploadContent,
    };
  } else if (!cities.includes(uploadContent.serviceCity)) {
    return {
      valid: false,
      message: 'City does not exist',
      data: uploadContent,
    };
  } 
  else if(typeof !uploadContent.category.toString()){
      uploadContent.category.map(async value => {
        if (!(await categories).category.includes(value)) {
          return {
            valid: false,
            message: 'Unknown Genre! Please Choose from Given options',
            data: uploadContent,
          }
        }
      })
    }
    else if (!(await categories).category.includes(uploadContent.category.toString())) {
        return {
          valid: false,
          message: 'Unknown Genre! Please Choose from Given options',
          data: uploadContent,
        }
  }
  else if (
    !(await categories).genders.includes(uploadContent.serviceGender)
  ) {
    return {
      valid: false,
      message: 'Invalid Gender Selected',
      data: uploadContent,
    };
  } else if (!(await categories).currency.includes(uploadContent.currency)) {
    return {
      valid: false,
      message: 'Invalid Currency',
      data: uploadContent,
    };
  } else if (
    !(await categories).languages.includes(uploadContent.serviceLanguage)
  ) {
    return {
      valid: false,
      message: 'Invalid Language',
      data: uploadContent,
    };
  } else if (uploadContent.servicePricing <= 0) {
    return {
      valid: false,
      message: "Service Pricing can't be less than or equal to 0!",
      data: uploadContent,
    };
  } else if (uploadContent.profession.length <= 0) {
    return {
      valid: false,
      message: "Profession can't be Empty!",
      data: uploadContent,
    };
  }
  const newState = getStateFromCity(uploadContent.serviceCity);
  uploadContent.serviceState = newState;

  !modification && (uploadContent.createdAt = new Date().toISOString());
  return { valid: true, message: '', data: uploadContent };
};
