import type {
  DocumentType,
  EventsFirebaseData,
} from '../../../redux/interfaces/backend/apis/admin-apis/pending-events';
import Server from '../../../firebase/firebase_server_exports';
import { constDocumentRefs } from '../../../firebase/constants/firestore';
import { ProductFireStoreSchema } from '../../../redux/interfaces/backend/apis';
import { ServicePortfolio } from '../../../redux/interfaces/backend/apis/servicePortfolio';

/**
 * Accounts API
 * @param isIndividual 
 * @param inVerified 
 * @param startWith 
 * @param endAt 
 * @returns 
 */
export const getAccounts = async (
  isIndividual: boolean,
  inVerified: boolean,
  startWith: number,
  endAt: number
) => {
  const startIndex = startWith ?? 0;
  const endIndex = endAt ?? 100;

  const accountRef = inVerified
    ? `${constDocumentRefs.users_pending}`
    : `${constDocumentRefs.users_rejected}`;

  const approvalDocuments = await Server.db
    .collection(accountRef)
    .offset(startIndex)
    .limit(endIndex)
    .where('accountType', '==', isIndividual ? 'Individual' : 'Business')
    .get();
  const data = approvalDocuments.docs.map((doc) => doc.data());
  return data;
};

export const approveAccounts = async (
  inVerified: boolean,
  accountIds: string[]
) => {
  const accountPromises = accountIds.map((element) => {
    return new Promise((resolve) => {
      const fromRef = `${constDocumentRefs.users_pending}/${element}`;
      const toRef = `${
        inVerified
          ? constDocumentRefs.users_verified
          : constDocumentRefs.users_rejected
      }/${element}`;
      Server.db
        .doc(fromRef)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            resolve(false);
          }
          const data = doc.data();
          if (data) {
            Server.db
              .doc(toRef)
              .set(data, { merge: true })
              .then(() => {
                Server.db
                  .doc(fromRef)
                  .delete()
                  .then(() => {
                    resolve(true);
                  });
              });
          } else resolve(false);
        });
    });
  });

  const results = await Promise.all(accountPromises);
  const userStatusRef = await Server.db
    .doc(constDocumentRefs.userAccounts)
    .get();
  const userStatus = userStatusRef.data() as { [key: string]: string };
  const statusString = inVerified ? 'verified' : 'rejected';

  accountIds.forEach((element) => {
    if (userStatus[element]) {
      userStatus[element] = statusString;
    }
  });

  await Server.db
    .doc(constDocumentRefs.userAccounts)
    .set(userStatus, { merge: true });
  return results.every((element) => element);
 
};

/**
 * Events API
 * @param eventType 
 * @param startWith 
 * @param endAt 
 * @returns 
 */
export const getEvents = async (
  eventType: DocumentType,
  startWith: number,
  endAt: number
) => {
  const startIndex = startWith ?? 0;
  const endIndex = endAt ?? 100;
  const pendingEventsRef = Server.db.collection(
    `${constDocumentRefs.merchants_meta_loc}/${eventType}`
  );
  const documentReferences = await pendingEventsRef.listDocuments();
  const documentIds = documentReferences.map((it) => it.id);

  const eventPromises = documentIds.map(
    (element) =>
      new Promise((resolve) => {
        Server.db
          .collection(
            `${constDocumentRefs.merchants_meta_loc}/${eventType}/${element}/events-collection`
          )
          .offset(startIndex)
          .limit(endIndex)
          .get()
          .then((data) => {
            const dataDocument = data.docs.map((dd) => {
              const individualData = dd.data();
              return {
                ...individualData,
                imageStorageLoadPath: `${constDocumentRefs.storage_events}/${element}/${individualData.serviceImageLoc}`,
              };
            });
            resolve(dataDocument);
          });
      })
  );

  const events = (await Promise.all(eventPromises)) as any[];

  const eventsData = events.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, []);

  const signedUrlPromises = eventsData.map(
    (element: EventsFirebaseData) =>
      new Promise((resolve) => {
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(element.imageStorageLoadPath)
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          })
          .then((res) => {
            resolve({
              ...element,
              publicUri: res[0],
            });
          });
      })
  );
  const eventsWithSignedUrls = (await Promise.all(signedUrlPromises)) as any[];
  return eventsWithSignedUrls;
};

export const markEvents = async (
  inVerified: boolean,
  eventLocations: string[]
) => {
  const uids = eventLocations.map(
    (element: string) => element.split('/')?.[4] ?? ''
  );
  const fileIds = eventLocations.map(
    (element: string) => element.split('/')?.[5] ?? ''
  );

  if (uids.length !== fileIds.length) {
    return false;
  }

  const updatePaths = uids
    .map((uid, index) => {
      const fileId = fileIds[index];
      if (uid === '' || fileId === '') return null;
      return {
        fromPath: `${constDocumentRefs.merchants_meta_loc}/pending/${uid}/events-collection/${fileId}`,
        toPath: `${constDocumentRefs.merchants_meta_loc}/${
          inVerified ? 'verified' : 'rejected'
        }/${uid}/events-collection/${fileId}`,
      };
    })
    .filter((element) => element !== null);

  const movementPromises = updatePaths.map((element) => {
    const elem = element as { fromPath: string; toPath: string };
    return new Promise((resolve) => {
      Server.db
        .doc(elem.fromPath)
        .get()
        .then((data) => {
          const dataDocument = data.data();
          if (dataDocument)
            Server.db
              .doc(elem.toPath)
              .set(dataDocument, { merge: true })
              .then(() => {
                Server.db
                  .doc(elem.fromPath)
                  .delete()
                  .then(() => {
                    resolve(true);
                  })
                  .catch(() => resolve(false));
              })
              .catch(() => resolve(false));
          else resolve(false);
        })
        .catch(() => resolve(false));
    });
  });

  const results = await Promise.all(movementPromises);
  return results.every((element) => element === true);
};

/**
 * Products API
 * @param eventType 
 * @param startWith 
 * @param endAt 
 * @returns 
 */
export const getProducts = async (
  eventType: DocumentType,
  startWith: number,
  endAt: number
) => {
  const startIndex = startWith ?? 0;
  const endIndex = endAt ?? 100;

  const productsRef = Server.db.collection(
    `${constDocumentRefs.merchants_meta_loc}/${eventType}`
  );
  const documentReferences = await productsRef.listDocuments();
  const documentIds = documentReferences.map((it) => it.id);

  const productPromises = documentIds.map(
    (element) =>
      new Promise((resolve) => {
        Server.db
          .collection(
            `${constDocumentRefs.merchants_meta_loc}/${eventType}/${element}/products-collection`
          )
          .offset(startIndex)
          .limit(endIndex)
          .get()
          .then((data) => {
            const dataDocument = data.docs.map((dd) => {
              const individualData = dd.data();
              return individualData;
            });
            resolve(dataDocument);
          });
      })
  );

  const products = (await Promise.all(productPromises)) as any[];

  const productsData = products.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, []);

  const signedUrlPromises = productsData.map(
    (element: ProductFireStoreSchema) =>
      new Promise((resolve) => {
        const allImagePromises = element.images.map((img) => {
          return new Promise((resolve) => {
            Server.storage
              .bucket(process.env.FB_STORAGE_BUCKET_NAME)
              .file(img.loc)
              .getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
              })
              .then((res) => {
                resolve({ ...img, tempView: res[0] });
              });
          });
        });
        Promise.all(allImagePromises).then((res) => {
          const uid = element.folderStoragePath.split('/')?.[4] ?? '';
          if (uid === '') {
            console.log('Error Occured invalid Uid, ', element);
            throw new Error('Empty UID Error');
          }
          const dbLocRef = `${constDocumentRefs.merchants_meta_loc}/${eventType}/${uid}/products-collection/${element.folderRef}`;
          resolve({
            ...element,
            images: res,
            dbLocRef,
          });
        });
      })
  );
  const productsWithSignedUrls = (await Promise.all(
    signedUrlPromises
  )) as any[];
  return productsWithSignedUrls;
};

export const markProducts = async (
  inVerified: boolean,
  productLocations: string[]
) => {
  if (productLocations.length === 0) {
    return false;
  }
  const promises = productLocations.map((element) => {
    'db-dev/user-metadata/portfolios/meta/pending/UGG3gdiCCpbUBmBWXK20jYM8WiH2/products-collection/product_1644068906443_7827';
    const newLocation = element.replace(
      '/pending/',
      `/${inVerified ? 'verified' : 'rejected'}/`
    );
    return new Promise((resolve) => {
      Server.db
        .doc(element)
        .get()
        .then((data) => {
          const dataDocument = data.data();
          if (dataDocument)
            Server.db
              .doc(newLocation)
              .set(dataDocument)
              .then(() => {
                Server.db
                  .doc(element)
                  .delete()
                  .then(() => {
                    resolve(true);
                  })
                  .catch(() => resolve(false));
              })
              .catch(() => resolve(false));
          else resolve(false);
        })
        .catch(() => resolve(false));
    });
  });
  const results = await Promise.all(promises);
  return results.every((element) => element === true);
};

/**
 * Services API
 * @param eventType 
 * @param startWith 
 * @param endAt 
 * @returns 
 */
export const getServices = async (
  eventType: DocumentType,
  startWith: number,
  endAt: number
) => {
  const startIndex = startWith ?? 0;
  const endIndex = endAt ?? 100;
  const pendingEventsRef = Server.db.collection(
    `${constDocumentRefs.merchants_meta_loc}/${eventType}`
  );
  const documentReferences = await pendingEventsRef.listDocuments();
  const documentIds = documentReferences.map((it) => it.id);

  const eventPromises = documentIds.map(
    (element) =>
      new Promise((resolve) => {
        Server.db
          .collection(
            `${constDocumentRefs.merchants_meta_loc}/${eventType}/${element}/services-collection`
          )
          .get()
          .then((data) => {
            const dataDocument = data.docs.map((dd) => {
              const individualData = dd.data();
              return {
                ...individualData,
                imageStorageLoadPath: `${constDocumentRefs.storage_services}/${element}/${individualData.serviceImageLoc}`,
              };
            });
            resolve(dataDocument);
          });
      })
  );

  const events = (await Promise.all(eventPromises)) as any[];

  const eventsData = events.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, []);

  const signedUrlPromises = eventsData.slice(startIndex, endIndex).map(
    (element: EventsFirebaseData) =>
      new Promise((resolve) => {
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(element.imageStorageLoadPath)
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          })
          .then((res) => {
            resolve({
              ...element,
              publicUri: res[0],
            });
          });
      })
  );
  const eventsWithSignedUrls = (await Promise.all(signedUrlPromises)) as any[];
  return eventsWithSignedUrls;
};

export const markServices = async (
  inVerified: boolean,
  eventLocations: string[]
) => {
  const uids = eventLocations.map(
    (element: string) => element.split('/')?.[4] ?? ''
  );
  const fileIds = eventLocations.map(
    (element: string) => element.split('/')?.[5] ?? ''
  );


  if (uids.length !== fileIds.length) {
    return false;
  }
  const replacements = ['pending', 'verified', 'rejected'];
  const newLocKeyword = inVerified ? 'verified' : 'rejected';
  const updatePaths = uids
    .map((uid, index) => {
      const fileId = fileIds[index];
      if (uid === '' || fileId === '') return null;
      return {
        fromPath: `${constDocumentRefs.merchants_meta_loc}/pending/${uid}/services-collection/${fileId}`,
        toPath: `${constDocumentRefs.merchants_meta_loc}/${newLocKeyword}/${uid}/services-collection/${fileId}`,
      };
    })
    .filter((element) => element !== null);

  const movementPromises = updatePaths.map((element) => {
    const elem = element as { fromPath: string; toPath: string };
    return new Promise((resolve) => {
      Server.db
        .doc(elem.fromPath)
        .get()
        .then((data) => {
          const dataDocument = data.data() as ServicePortfolio;
          if (dataDocument) {
            const location = data.id;
            // const newLocation = location
            //   .split('/')
            //   .map((element) =>
            //     replacements.includes(element) ? newLocKeyword : element
            //   )
            //   .join('/');
            dataDocument.id = elem.toPath;
            Server.db
              .doc(elem.toPath)
              .set(dataDocument)
              .then(() => {
                Server.db
                  .doc(elem.fromPath)
                  .delete()
                  .then(() => {
                    resolve(true);
                  })
                  .catch(() => resolve(false));
              })
              .catch(() => resolve(false));
          } else resolve(false);
        })
        .catch(() => resolve(false));
    });
  });

  const results = await Promise.all(movementPromises);
  return results.every((element) => element === true);
};
