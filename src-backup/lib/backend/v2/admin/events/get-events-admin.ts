import Server from '../../../../../firebase/firebase_server_exports';
import { constDocumentRefs } from '../../../../../firebase/constants/firestore';
import { InsertionType } from '../../../../../redux/interfaces/backend/apis/v2/common';
import {
  IAddEventDatabase,
  IAddEventFrontend,
} from '../../../../../redux/interfaces/backend/apis/v2/events';
import { sendFrontendRequiredParams } from '../../user-profile/events/add-events-users';

//Events
export const getAdminEvents = async (
  eventType: InsertionType,
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
          .where('isDeleted', '==', false)
          .orderBy('modifiedAt', 'desc')
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

  const events = (await Promise.all(eventPromises)) as any[];

  const eventsData = events.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, [] as IAddEventDatabase[]);

  const signedUrlPromises = eventsData.map(
    (element: IAddEventDatabase) =>
      new Promise((resolve) => {
        Server.storage
          .bucket(process.env.FB_STORAGE_BUCKET_NAME)
          .file(element.imageLocation)
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
          })
          .then((res) => {
            const frontendFormat = sendFrontendRequiredParams(element);
            frontendFormat.imageUri = res[0];
            frontendFormat.uid = element.uid;
            resolve(frontendFormat);
          });
      })
  );
  const eventsWithSignedUrls = (await Promise.all(
    signedUrlPromises
  )) as IAddEventFrontend[];
  return eventsWithSignedUrls;
};

export const markEvent = async (inVerified: boolean, location: string) => {
  const doc = await Server.db.doc(location).get();
  const data = doc.data() as IAddEventDatabase;
  const newLocKeyword = inVerified ? 'verified' : 'rejected';
  const replacements = ['pending', 'verified', 'rejected'];
  const locSplits = location.split('/');
  if (locSplits.length < 8) {
    return false;
  }
  if (data) {
    const newLocation = location
      .split('/')
      .map((element) =>
        replacements.includes(element) ? newLocKeyword : element
      )
      .join('/');
    data.id = newLocation;
    await Server.db.doc(newLocation).set(data, { merge: true });
    await Server.db.doc(location).delete();
    return true;
  }
  return false;
};

export const getData = async () => {
  const portfolio = await Server.db
    .doc(
      'db-dev/user-metadata/portfolios/images/UGG3gdiCCpbUBmBWXK20jYM8WiH2/image_1646558495672_gallery.jpg'
    )
    .get();

  const event = await Server.db
    .doc(
      'db-dev/user-metadata/portfolios/meta/rejected/UGG3gdiCCpbUBmBWXK20jYM8WiH2/events-collection/img__1646558759807__gallery.jpg'
    )
    .get();

  const service = await Server.db
    .doc(
      'db-dev/user-metadata/portfolios/meta/rejected/UGG3gdiCCpbUBmBWXK20jYM8WiH2/services-collection/image_1646558735890_gallery.jpg'
    )
    .get();
  const products = await Server.db
    .doc(
      '/db-dev/user-metadata/portfolios/meta/rejected/UGG3gdiCCpbUBmBWXK20jYM8WiH2/products-collection/products_1646558608513__6360551'
    )
    .get();

  const portfolioData = portfolio.data();
  const eventData = event.data();
  const serviceData = service.data();
  const productData = products.data();
  return {
    portfolioData,
    eventData,
    serviceData,
    productData,
  };
};
