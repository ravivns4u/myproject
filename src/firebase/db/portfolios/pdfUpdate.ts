import { constDocumentRefs } from '../../constants/firestore';
import Server from '../../firebase_server_exports';

export const updatePDF = async (
    data: any,
    modification: boolean
  ) => {
    try {
      const pdfCollection = Server.db.collection(
        `${constDocumentRefs.pdf_services}/${data.uid}`
      );
      !modification && (data.createdAt = new Date().toISOString());
      data.modifiedAt = new Date().toISOString();
      await pdfCollection.doc(data.fp).set(data, { merge: true });
      return true;
    } catch (err) {
      console.log('Error happened ', err);
      return false;
    }
  };