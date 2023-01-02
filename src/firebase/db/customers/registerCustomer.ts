import { determineMissingKeysinAnObject } from '../../../lib/backend/missingKeys';
import { phoneNumberConverter } from '../../../lib/backend/validators/phoneNumber';
import { FirebaseCustomerSchema } from '../../../redux/interfaces/backend/firestore/registerNewUser';
import { constDocumentRefs, customerKeys } from '../../constants/firestore';
import Server from '../../firebase_server_exports';
import { slugUIdMap } from '../../public/getUserPortfolio';
import { getUserSlug } from '../slugGenerator';

export const registerNewCustomer = async (
  uid: string,
  userData: FirebaseCustomerSchema
) => {
  const keysMissing = determineMissingKeysinAnObject(userData, customerKeys);
  if (keysMissing.error) {
    return keysMissing;
  }

  const phone = phoneNumberConverter(userData.phone);
  const email = userData.email;
  const displayName = userData.displayName;

  const operationPromises = [
    Server.db
      .doc(constDocumentRefs.userAccounts)
      .set({ [uid]: 'verified' }, { merge: true }),
    Server.db
      .doc(constDocumentRefs.users_registered)
      .set({ [phone]: email }, { merge: true }),
  ];

  await Promise.all(operationPromises);
  const slug = await getUserSlug(displayName);
  userData.slug = slug;
  userData.uid = uid;
  await Server.db
    .doc(`${constDocumentRefs.customers}/${uid}`)
    .set(userData, { merge: true });
  await slugUIdMap(slug, uid);
  return true;
};
