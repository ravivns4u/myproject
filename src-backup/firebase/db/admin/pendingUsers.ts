import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';
import { DocumentData } from 'firebase/firestore';

export const getPendingUsers = async () => {
  try {
    const docRef = Server.db.collection(constDocumentRefs.users_pending);
    const allData = await docRef.get();
    const data = allData.docs.map((doc) => doc.data());
    return { error: false, data: data };
  } catch (err) {
    console.log('Error[src\firebasedbadminpendingUsers.ts:Line-9] = ', err);
    return { error: true, data: [] };
  }
};

export const getRejectedUsers = async () => {
  try {
    const docRef = Server.db.collection(constDocumentRefs.users_rejected);
    const allData = await docRef.get();
    const data = allData.docs.map((doc) => doc.data());
    return { error: false, data: data };
  } catch (err) {
    console.log('Error[src\firebasedbadminpendingUsers.ts:Line-24] = ', err);
    return { error: true, data: [] };
  }
};

export const moveToVerified = async (uids: string[], inVerified: boolean) => {
  try {
    const docRef = Server.db.collection(constDocumentRefs.users_pending);
    const promises: Promise<DocumentData>[] = [];
    uids.forEach((uid) => {
      promises.push(docRef.doc(uid).get());
    });
    const allData = await Promise.all(promises);
    const isInvalidDocument = allData.some((element) => !element.exists);
    if (isInvalidDocument) {
      return false;
    }
    const data = allData.map((doc) => doc.data());
    const verifiedCollection = Server.db.collection(
      inVerified
        ? constDocumentRefs.users_verified
        : constDocumentRefs.users_rejected
    );
    const promises2: Promise<any>[] = [];
    data.forEach((element) => {
      promises2.push(
        verifiedCollection.doc(element.uid).set(element, { merge: true })
      );
    });
    //Update Verification Link As well
    const updateStatement = inVerified ? 'verified' : 'rejected';
    const uidVerified = uids.reduce((acc, curr) => {
      acc[curr] = updateStatement;
      return acc;
    }, {} as { [key: string]: string });
    await Server.db.doc(constDocumentRefs.userAccounts).update(uidVerified);
    await Promise.all(promises2);

    //Delete from Pending in Batch
    const batch = Server.db.batch();
    uids.forEach((uid) => {
      batch.delete(docRef.doc(uid));
    });
    await batch.commit();
    return true;
  } catch (err) {
    console.log('Error[src\firebasedbadminpendingUsers.ts:Line-32] = ', err);
    return false;
  }
};
