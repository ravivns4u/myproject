import { constDocumentRefs } from '../constants/firestore';
import Server from '../firebase_server_exports';

export const getUserFeeds = async (
  slug: string,
  startWith: number,
  endWith: number
) => {
  const uid = await getUidFromSlug(slug);
  if (uid === '') {
    return [];
  }
  const documentRef = Server.db
    .collection(`${constDocumentRefs.users_feed_image}`)
    .orderBy('modifiedAt', 'desc')
    .offset(startWith)
    .limit(endWith);

  const { docs } = await documentRef.get();
  const data = docs.map((doc) => doc.data());

  const promises = data.map(
    (element, index) =>
      new Promise((resolve, reject) => {
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(element.fullPath)
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          })
          .then((uri) =>
            resolve({
              id: index,
              title: element.title,
              description: element.textContent,
              publicUri: uri[0],
            })
          )
          .catch((err) =>
            reject({
              id: index,
              title: element.title,
              description: element.textContent,
              publicUri:
                'https://media.istockphoto.com/vectors/error-page-or-file-not-found-icon-vector-id924949200?k=20&m=924949200&s=170667a&w=0&h=-g01ME1udkojlHCZeoa1UnMkWZZppdIFHEKk6wMvxrs=',
            })
          );
      })
  );
  const results = await Promise.all(promises);
  return { data: results };
};

export const getUserEventsBySlug = async (
  slug: string,
  startWith: number,
  endWith: number
) => {
  const uid = await getUidFromSlug(slug);
  if (uid === '') {
    return [];
  }
  const documentRef = Server.db
    .collection(
      `${constDocumentRefs.merchants_meta_loc}/verified/${uid}/events-collection`
    )
    .orderBy('modifiedAt', 'desc')
    .offset(startWith)
    .limit(endWith);

  const { docs } = await documentRef.get();
  const data = docs.map((doc) => doc.data());

  const promises = data.map(
    (element, index) =>
      new Promise((resolve, reject) => {
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(
            `db-dev/user-metadata/portfolio/events/${uid}/${element.serviceImageLoc}`
          )
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          })
          .then((uri) =>
            resolve({
              id: index,
              serviceName: element.serviceName,
              location: element.serviceState,
              date: element.serviceCity,
              price: element.servicePricing,
              description: element.serviceDescription,
              publicUri: uri[0],
            })
          )
          .catch((err) =>
            reject({
              id: index,
              serviceName: element.serviceName,
              location: element.serviceState,
              date: element.serviceCity,
              price: element.servicePricing,
              description: element.serviceDescription,
              publicUri:
                'https://media.istockphoto.com/vectors/error-page-or-file-not-found-icon-vector-id924949200?k=20&m=924949200&s=170667a&w=0&h=-g01ME1udkojlHCZeoa1UnMkWZZppdIFHEKk6wMvxrs=',
            })
          );
      })
  );
  const results = await Promise.all(promises);
  return { data: results };
};

export const getUserServicesBySlug = async (
  slug: string,
  startWith: number,
  endWith: number
) => {
  const uid = await getUidFromSlug(slug);
  if (uid === '') {
    return [];
  }
  const documentRef = Server.db
    .collection(
      `${constDocumentRefs.merchants_meta_loc}/verified/${uid}/services-collection`
    )
    .orderBy('modifiedAt', 'desc')
    .offset(startWith)
    .limit(endWith);

  const { docs } = await documentRef.get();
  const data = docs.map((doc) => doc.data());

  const promises = data.map(
    (element, index) =>
      new Promise((resolve, reject) => {
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(
            `db-dev/user-metadata/portfolio/services/${uid}/${element.serviceImageLoc}`
          )
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          })
          .then((uri) =>
            resolve({
              id: index,
              serviceName: element.serviceName,
              location: `${element.serviceCity}, ${element.serviceState}`,
              timeDuration: element.serviceDuration,
              price: element.servicePricing,
              description: element.serviceDescription,
              publicUri: uri[0],
            })
          )
          .catch((err) =>
            reject({
              id: index,
              serviceName: element.serviceName,
              location: `${element.serviceCity}, ${element.serviceState}`,
              timeDuration: element.serviceDuration,
              price: element.servicePricing,
              description: element.serviceDescription,
              publicUri:
                'https://media.istockphoto.com/vectors/error-page-or-file-not-found-icon-vector-id924949200?k=20&m=924949200&s=170667a&w=0&h=-g01ME1udkojlHCZeoa1UnMkWZZppdIFHEKk6wMvxrs=',
            })
          );
      })
  );
  const results = await Promise.all(promises);
  return { data: results };
};

export const getPublicDp = async (slug: string) => {
  const uid = await getUidFromSlug(slug);
  if (uid === '') {
    return { exists: false, dp: '' };
  }
  const dp = await getPublicDpLocation(uid);
  if (dp !== '') {
    const publicUri = await Server.storage
      .bucket(process.env.FB_STORAGE_BUCKET_NAME)
      .file(dp)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
      });
    return { exists: true, dp: publicUri[0] };
  }
  return { exists: false, dp: '' };
};

export const getPublicDpLocation = async (uid: string): Promise<string> => {
  const documentRef = Server.db.doc(constDocumentRefs.profile_images);
  const data = await documentRef.get();
  const dp = await data.get(uid);
  return dp ?? '';
};

export const getUidFromSlug = async (slug: string) => {
  const slugs = await Server.db.doc(constDocumentRefs.slug_uids).get();
  const uid = await slugs.get(slug);
  return uid ?? '';
};

export const slugUIdMap = async (slug: string, uid: string) => {
  const slugUidRef = Server.db.doc(constDocumentRefs.slug_uids);
  await slugUidRef.set({ [slug]: uid }, { merge: true });
  return true;
};
