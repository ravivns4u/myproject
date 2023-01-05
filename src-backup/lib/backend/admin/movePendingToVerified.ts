import Server from '../../../firebase/firebase_server_exports';
import { specificDocumentRefs } from '../../../firebase/constants/firestore';
interface IndividualFirebaseData {
  userType: string;
  displayName: string;
  createdTimeStamp: string;
  socialMediaLink: string;
  specificRequests: string;
  profession: string;
  state: string;
  phone: string;
  serviceTypes: string;
  adminApproval: string;
  accountType: string;
  slug: string;
  uid: string;
  bio: string;
  lastModifiedBy: string;
  professionType: string;
  city: string;
  email: string;
  modifiedTimeStamp: string;
  workExperience: number;
  achievements: string;
}

export const movePendingToVerified = async (
  uid: string,
  dbtype: 'dev' | 'prod'
) => {
  //Places to make changes
  //1. users and 2. user-status

  //users
  const usersDb =
    dbtype === 'dev'
      ? specificDocumentRefs.users_dev
      : specificDocumentRefs.users_prod;
  const usersCollection = await Server.db.doc(usersDb).collection('pending');
  const userDocs = await usersCollection.doc(uid).get();

  if (!userDocs.exists) {
    return { error: true, message: 'Data was not found' };
  }
  const data = userDocs.data() as IndividualFirebaseData;
  data.adminApproval = 'verified';
  data.lastModifiedBy = 'Admin';
  data.modifiedTimeStamp = new Date().toISOString();
  await Server.db
    .doc(usersDb)
    .collection('verified')
    .doc(uid)
    .set(data, { merge: true });

  await usersCollection.doc(uid).delete();

  //user-status
  const rootDb =
    dbtype === 'dev'
      ? specificDocumentRefs.user_status_dev
      : specificDocumentRefs.user_status_prod;

  const userStatus = await Server.db.doc(rootDb);
  await userStatus.update({ [uid]: 'verified' });
  return { error: false, message: 'Modification Successful' };
};

export const movePendingToVerifiedinBulk = async (
  uids: string[],
  dbtype: 'dev' | 'prod'
) => {
  //Places to make changes
  //1. users and 2. user-status

  //users
  const usersDb =
    dbtype === 'dev'
      ? specificDocumentRefs.users_dev
      : specificDocumentRefs.users_prod;
  const usersCollection = await Server.db.doc(usersDb).collection('pending');
  const userDocs = await usersCollection.where('uid', 'in', uids).get();

  if (userDocs.empty) {
    return { error: true, message: 'Data was not found' };
  }
  const data = (
    userDocs.docs.map((doc) => doc.data()) as IndividualFirebaseData[]
  ).map((element) => {
    element.adminApproval = 'verified';
    element.lastModifiedBy = 'Admin';
    element.modifiedTimeStamp = new Date().toISOString();
    return element;
  });

  const batch = Server.db.batch();
  await data.map(async (item) => {
    const collectionRef = await Server.db
      .doc(usersDb)
      .collection('verified')
      .doc(item.uid);
    batch.create(collectionRef, item);
  });

  await batch.commit();

  const deleteBatch = Server.db.batch();
  userDocs.forEach((doc) => deleteBatch.delete(doc.ref));
  await deleteBatch.commit();
  const newUids = uids.reduce((acc, curr) => {
    acc[curr] = 'verified';
    return acc;
  }, {} as Record<string, string>);

  //user-status
  const rootDb =
    dbtype === 'dev'
      ? specificDocumentRefs.user_status_dev
      : specificDocumentRefs.user_status_prod;

  const userStatus = await Server.db.doc(rootDb);
  await userStatus.update(newUids);
  return { error: false, message: 'Modification Successful' };
};

export const modifyInBulk = async (
  uidMaps: Record<string, string>,
  dbtype: 'dev' | 'prod'
) => {
  //Places to make changes
  //1. users and 2. user-status

  const uids = Object.keys(uidMaps);
  if (uids.length === 0) {
    return { error: false, message: 'No data to modify' };
  }

  //users
  const usersDb =
    dbtype === 'dev'
      ? specificDocumentRefs.users_dev
      : specificDocumentRefs.users_prod;
  const usersCollection = await Server.db.doc(usersDb).collection('pending');
  const userDocs = await usersCollection.where('uid', 'in', uids).get();

  if (userDocs.empty) {
    return { error: true, message: 'Data was not found' };
  }
  const data = (
    userDocs.docs.map((doc) => doc.data()) as IndividualFirebaseData[]
  ).map((element) => {
    element.adminApproval = uidMaps[element.uid] ?? 'rejected';
    element.lastModifiedBy = 'Admin';
    element.modifiedTimeStamp = new Date().toISOString();
    return element;
  });

  const rejectedData = await data.filter(
    (element) => element.adminApproval === 'rejected'
  );
  const approvedData = await data.filter(
    (element) => element.adminApproval === 'verified'
  );

  const approvedBatch = Server.db.batch();
  await approvedData.map(async (item) => {
    const collectionRef = await Server.db
      .doc(usersDb)
      .collection('verified')
      .doc(item.uid);
    approvedBatch.create(collectionRef, item);
  });

  await approvedBatch.commit();

  const rejectedBatch = Server.db.batch();
  await rejectedData.map(async (item) => {
    const collectionRef = await Server.db
      .doc(usersDb)
      .collection('rejected')
      .doc(item.uid);
    rejectedBatch.create(collectionRef, item);
  });

  await rejectedBatch.commit();

  const deleteBatch = Server.db.batch();
  userDocs.forEach((doc) => deleteBatch.delete(doc.ref));
  await deleteBatch.commit();

  const newUids = uids.reduce((acc, curr) => {
    acc[curr] = uidMaps[curr];
    return acc;
  }, {} as Record<string, string>);

  //user-status
  const rootDb =
    dbtype === 'dev'
      ? specificDocumentRefs.user_status_dev
      : specificDocumentRefs.user_status_prod;

  const userStatus = await Server.db.doc(rootDb);
  const promises: Promise<any>[] = [];
  Object.keys(uidMaps).forEach((key) => {
    promises.push(
      Server.auth.setCustomUserClaims(key, {
        adminApproved: uidMaps[key] === 'verified',
      })
    );
  });
  await Promise.all(promises);
  await userStatus.update(newUids);
  return { error: false, message: 'Modification Successful' };
};

export const getCustomClaims = async (uids: string[]) => {
  uids.forEach(async (uid) => {
    const customClaim = await Server.auth.getUser(uid);
    console.log('Custom claim for uid = ', uid, ' ', await customClaim);
  });
  return {};
};
