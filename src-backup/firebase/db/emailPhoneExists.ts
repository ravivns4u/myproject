import Server from '../firebase_server_exports';
import { constDocumentRefs } from '../constants/firestore';
import { phoneNumberConverter } from '../../lib/backend/validators/phoneNumber';
export const verifyUserExistence = async (email: string, phone: string) => {
  const phoneNumber = phoneNumberConverter(phone);
  const docRef = await Server.db.doc(constDocumentRefs.users_registered).get();
  const allData = docRef.data();
  if (allData !== undefined) {
    const numberExists = allData[phoneNumber] ? true : false;
    const emails = Object.values(allData);
    const emailExists = emails.includes(email);
    return { numberExists, emailExists };
  }
  return { emailExists: false, numberExists: false };
};

export const emailDocsUpdated = async (email: string, phone: string) => {
  const convertPhoneNumber = phoneNumberConverter(phone);
  try {
    await Server.db.doc(constDocumentRefs.users_registered).update({
      [convertPhoneNumber]: email,
    });
    return true;
  } catch (error) {
    return false;
  }
};
