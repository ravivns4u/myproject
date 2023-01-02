import Server from '../firebase_server_exports';
import type {
  NewUserProfessionalMetaData,
  DataSchema,
  ProfessionalAccountType,
  FireStoreMerchantUserSchema,
  FireStoreMerchantCompanySchema,
  NewUserMerchantMetaData,
  BusinessAccount,
} from '../../redux/interfaces/backend/firestore';
import { determineMissingKeysinAnObject } from '../../lib/backend/missingKeys';
import {
  newMerchantIndividualRegistrationKeys,
  customerKeys,
  newMerchantBusinessRegistrationKeys,
  constDocumentRefs,
} from '../constants/firestore';
import { convertToSlug } from '../../lib/backend/slugGenerator';
import { getUserSlug } from '../../firebase/db/slugGenerator';
import type { CombinedUserCompanySchema } from '../../redux/interfaces/frontend/user';
import { FirebaseCustomerSchema } from '../../redux/interfaces/backend/firestore/registerNewUser';
import { slugUIdMap } from '../public/getUserPortfolio';
export const appenDataToCollection = async (collectionAddress: string, data: any) => {
  try {
    const isOddPath = collectionAddress.split('/').length % 2 !== 0;
    if (!isOddPath) {
      const documentRef = Server.db.doc(collectionAddress);
      await documentRef.set(data, { merge: true });
    } else {
      const documentRef = Server.db.collection(collectionAddress);
      await documentRef.add(data);
    }

    return { error: false, msg: '' };
  } catch (err) {
    console.log('Errror = ', err);
    return { error: true, msg: 'Failed to append Data!' };
  }
};

export const appendDocumentWithIdToCollection = async (collectionAddress: string, data: any, id: string) => {
  try {
    await Server.db.collection(collectionAddress).doc(id).set(data, { merge: true });
    return { error: false, msg: '' };
  } catch (err) {
    console.log('Errror = ', err);
    return { error: true, msg: 'Failed to append Data!' };
  }
};

const registerNewUserData = async (userId: string) => {
  const userRegistration = await appenDataToCollection(constDocumentRefs.userAccounts, { [userId]: 'pending' });
  return userRegistration;
};

export const registerUserTableData = async (data: DataSchema, userType: ProfessionalAccountType) => {
  const { displayName } = data;
  const slug = await getUserSlug(displayName);
  data.slug = slug;

  if (userType === undefined) {
    const keysMissing = determineMissingKeysinAnObject(data, customerKeys);
    const { uid } = data;
    if (keysMissing.error) {
      return keysMissing;
    }
    const firebaseDocument = prepareCustomerSchema(data as FirebaseCustomerSchema);
    const accResponse = await registerNewUserData(uid);
    const response = await appendDocumentWithIdToCollection(constDocumentRefs.users_pending, firebaseDocument, uid);
    if (accResponse.error || response.error) {
      return { error: true, msg: 'Failed to register user!' };
    }
    await slugUIdMap(slug, uid);
    return response;
  } else if (userType === 'Individual') {
    const keysMissing = determineMissingKeysinAnObject(data, newMerchantIndividualRegistrationKeys);
    const { uid } = data;
    if (keysMissing.error) {
      return keysMissing;
    }
    const firebaseDocument = prepareMerchantUserSchema(data as NewUserProfessionalMetaData);
    const accResponse = await registerNewUserData(uid);
    const response = await appendDocumentWithIdToCollection(constDocumentRefs.users_pending, firebaseDocument, uid);
    await slugUIdMap(slug, uid);
    if (accResponse.error || response.error) {
      return { error: true, msg: 'Failed to register user!' };
    }

    return response;
  } else {
    console.log('UID');
    // const keysMissing = determineMissingKeysinAnObject(
    //   data,
    //   newMerchantBusinessRegistrationKeys
    // );
    const { uid } = data;
    // if (keysMissing.error) {
    //   return keysMissing;
    // }
    const firebaseDocument = prepareMerchantOrgSchema(data as NewUserMerchantMetaData);
    const accResponse = await registerNewUserData(uid);
    const response = await appendDocumentWithIdToCollection(constDocumentRefs.users_pending, firebaseDocument, uid);
    await slugUIdMap(slug, uid);
    if (accResponse.error || response.error) {
      return { error: true, msg: 'Failed to register user!' };
    }

    return response;
  }
};

const prepareMerchantUserSchema = (data: NewUserProfessionalMetaData) => {
  const {
    uid,
    email,
    displayName,
    professionType,
    workExperience,
    socialMediaLink,
    achievements,
    specificRequests,
    address,
    serviceTypes,
    phone,
    slug,
    profession,
    categories,
    languages,
    certifications,
    bio,
  } = data;
  const firebaseDocument: FireStoreMerchantUserSchema = {
    uid,
    email,
    phone,
    modifiedTimeStamp: new Date().toISOString(),
    createdTimeStamp: new Date().toISOString(),
    lastModifiedBy: 'User',
    accountType: 'Individual',
    adminApproval: 'Pending',
    userType: 'Professionals',
    displayName,
    bio,
    professionType,
    workExperience,
    socialMediaLink,
    achievements,
    certifications,
    slug: slug ?? convertToSlug(displayName),
    profession,
    categories,
    specificRequests,
    state: address.state,
    city: address.city,
    serviceTypes,
    languages: languages,
    subscription: false,
    subscriptionStartDate: new Date().toISOString(),
    subscriptionEndDate: new Date().toISOString(),
  };
  return firebaseDocument;
};

const prepareMerchantOrgSchema = (data: NewUserMerchantMetaData) => {
  const {
    uid,
    email,
    displayName,
    companyName,
    achievements,
    phone,
    tieupDetails,
    website,
    specificRequests,
    companyAddress,
    bio,
    slug,
    socialMediaLink,
    certifications,
  } = data;
  const firebaseDocument: FireStoreMerchantCompanySchema = {
    uid,
    email,
    phone: phone,
    modifiedTimeStamp: new Date().toISOString(),
    createdTimeStamp: new Date().toISOString(),
    lastModifiedBy: 'User',
    accountType: 'Business' as BusinessAccount,
    adminApproval: 'Pending',
    userType: 'Professionals',
    displayName,
    companyName,
    tieupDetails,
    website,
    specificRequests,
    companyAddress,
    bio,
    achievements,
    certifications,
    slug: slug ?? convertToSlug(companyName),
    socialMediaLink,
    subscription: false,
    subscriptionStartDate: new Date().toISOString(),
    subscriptionEndDate: new Date().toISOString(),
  };
  return firebaseDocument;
};

const prepareCustomerSchema = (data: FirebaseCustomerSchema): FirebaseCustomerSchema => ({
  ...data,
  uid: data.uid,
  email: data.email,
  phone: data.phone,
  displayName: data.displayName,
  photoURL: data.photoURL,
  userType: 'Customers',
  slug: data.slug,
});

export const updateUserData = async (uid: string, data: CombinedUserCompanySchema) => {
  const refDoc = `${constDocumentRefs.users_verified}/${uid}`;
  if (data.accountType !== 'Business') {
    const updateDocument = {
      email: data.email,
      phone: data.phone,
      modifiedTimeStamp: new Date().toISOString(),
      lastModifiedBy: 'User',
      accountType: data.accountType,
      userType: 'Professionals',
      displayName: data.displayName,
      bio: data.bio,
      professionType: data.professionType ?? 'Undefined Profession Type',
      workExperience: data.workExperience ?? 0,
      socialMediaLink: data.socialMediaLink,
      achievements: data.achievements,
      profession: data.profession,
      categories: data.categories,
      specificRequests: data.specificRequests,
      state: data.state,
      city: data.city,
      serviceTypes: data.serviceTypes,
      languages: data.languages,
      certifications: data.certifications ?? '',
      plan: data.plan ?? '',
      razorpay_order_id: data.razorpay_order_id ?? '',
      razorpay_payment_id: data.razorpay_payment_id ?? '',
      razorpay_signature: data.razorpay_signature ?? '',
      subscription: data.subscription ?? false,
      subscriptionStartDate: data.subscriptionStartDate ? data.subscriptionStartDate : new Date().toISOString(),
      subscriptionEndDate: data.subscriptionEndDate ? data.subscriptionEndDate : new Date().toISOString(),
    };
    try {
      await Server.db.doc(refDoc).set(updateDocument, { merge: true });
      if (data.subscription_change) {
        await startSubscriptionNotification(data);
      }

      if (data.plan === 'pro') {
        await endSubscriptionNotification(data);
      }
      return { error: false, msg: '' };
    } catch (err) {
      console.log('Error = ', err);
      return { error: true, msg: 'Failed to update user data' };
    }
  } else {
    const updateDocument = {
      email: data.email,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      displayName: data.displayName,
      tieupDetails: data.tieupDetails,
      socialMediaLink: data.socialMediaLink,
      website: data.website,
      achievements: data.achievements,
      specificRequests: data.specificRequests,
      bio: data.bio,
      certifications: data.certifications,
      subscription: data.subscription ?? false,
      plan: data.plan ?? '',
      razorpay_order_id: data.razorpay_order_id ?? '',
      razorpay_payment_id: data.razorpay_payment_id ?? '',
      razorpay_signature: data.razorpay_signature ?? '',
      subscriptionStartDate: data.subscriptionStartDate ? data.subscriptionStartDate : new Date().toISOString(),
      subscriptionEndDate: data.subscriptionEndDate ? data.subscriptionEndDate : new Date().toISOString(),
    };
    try {
      await Server.db.doc(refDoc).set(updateDocument, { merge: true });
      if (data.subscription_change) {
        await startSubscriptionNotification(data);
      }

      if (data.plan === 'pro') {
        await endSubscriptionNotification(data);
      }
      return { error: false, msg: '' };
    } catch (err) {
      console.log('Error = ', err);
      return { error: true, msg: 'Failed to update user data' };
    }
  }
};

export const startSubscriptionNotification = async (data: any) => {
  try {
    let payload: any;
    const ts = await new Date().getTime();

    payload = {
      notification: `Your ${data.plan} Plan Subscription Has Been Started`,
      mark_as_read: false,
      notification_type: 'Subscription_Start',
      createdAt: new Date().toISOString(),
      metadata: { uid: data.uid, name: data.displayName },
      subscriptionEndDate: data.subscriptionEndDate,
      subscriptionStartDate: data.subscriptionStartDate,
      users: {},
      fp: `notification_${ts}`,
      plan: data?.plan,
    };
    const feedCollection = await Server.db.collection(`${constDocumentRefs.feed_notifications}`);

    await feedCollection.doc(`notification_${ts}`).set(payload, { merge: true });
    return true;
  } catch (err) {
    console.log('Error happened ', err);
    return false;
  }
};

export const endSubscriptionNotification = async (data: any) => {
  try {
    const ts = await new Date().getTime();
    const days = [-5, -3, -2, -1, 0, 1];

    days.forEach(async (item) => {
      const payload = {
        notification:
          item === 0 || item === 1
            ? `Your subscription has been ended please renew`
            : `Your Subscription Will Be Ending in ${Math.abs(item)} Days`,
        mark_as_read: false,
        notification_type: 'Subscription_End',
        createdAt: new Date().toISOString(),
        metadata: { uid: data.uid, name: data.displayName },
        subscriptionEndDate: data.subscriptionEndDate,
        subscriptionStartDate: data.subscriptionStartDate,
        users: {},
        fp: `notification_${item}_${ts}`,
        plan: data?.plan,
      };
      const feedCollection = await Server.db.collection(`${constDocumentRefs.feed_notifications}`);
      await feedCollection.doc(`notification_${item}_${ts}`).set(payload, { merge: true });
    });

    return true;
  } catch (err) {
    console.log('Error happened ', err);
    return false;
  }
};
