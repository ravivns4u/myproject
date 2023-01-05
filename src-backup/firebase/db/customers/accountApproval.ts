import Server from '../../firebase_server_exports';
import { constDocumentRefs } from '../../constants/firestore';
import { AccountVerificationResponse } from '../../../redux/interfaces/backend/firestore';
import type { FireStoreMerchantUserSchema } from '../../../redux/interfaces/backend/firestore';
export const getAccountApproval = async (
  uid: string
): Promise<AccountVerificationResponse> => {
  const docRef = await Server.db.doc(`${constDocumentRefs.userAccounts}`).get();
  const data = await docRef.get(uid);

  console.log("user data:", data);

  if (
    data === undefined &&
    (data !== 'verified' || data !== 'pending' || data !== 'rejected')
  ) {
    return { adminApproved: false, account: false };
  }
  const slugRef = await Server.db
    .collection(constDocumentRefs.customers)
    .doc(uid)
    .get();

    console.log("slugRef: ", slugRef);

  const slugData = await slugRef.data();

  console.log("slugData: ", slugData);

  if (data === 'verified') {
    return {
      adminApproved: true,
      account: true,
      customerSlug: slugData?.slug || '',
      user: slugData as any ,
    };
  } else
    return {
      adminApproved: false,
      account: true,
      customerSlug: slugData?.slug || '',
      user: slugData as any,
    };
};
