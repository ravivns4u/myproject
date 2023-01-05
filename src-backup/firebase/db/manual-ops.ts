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
  newMerchantBusinessRegistrationKeys,
  constDocumentRefs,
} from '../constants/firestore';
import { convertToSlug } from '../../lib/backend/slugGenerator';
import { getUserSlug } from '../../firebase/db/slugGenerator';
import type { CombinedUserCompanySchema } from '../../redux/interfaces/frontend/user';

export const appendDocumentWithIdToCollection = async (
  collectionAddress: string,
  fromAddress: string,
  id: string
) => {
  try {
    const docRef = await Server.db.doc(fromAddress).get();
    const dataToAppend = await docRef.data();
    if (dataToAppend)
      await Server.db
        .collection(collectionAddress)
        .doc(id)
        .set(dataToAppend, { merge: true });
    else return { error: true, msg: 'Non Existing Data' };
    return { error: false, msg: '' };
  } catch (err) {
    console.log('Errror = ', err);
    return { error: true, msg: 'Failed to append Data!' };
  }
};
