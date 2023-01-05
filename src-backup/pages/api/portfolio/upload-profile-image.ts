import type { NextApiHandler } from 'next';
import { withUserProtect } from '../../../lib/backend/middleware/withUserProtect';
import { updateProfileImage } from '../../../firebase/db/portfolios/profileImages';
import {
  genericResponse as gR,
  errorResponse as eR,
} from '../../../lib/backend/responseSynthesizer';

export interface IUploadImage {
  uid: string;
  imageStorageLoc: string;
  firebaseToken: string;
}
const countHandler: NextApiHandler = async (request, response) => {
  const { uid, imageStorageLoc } = request.body as IUploadImage;

  try {
    await updateProfileImage(uid, imageStorageLoc);

    response.json(gR({ msg: 'Upload Successful' }));
  } catch (e) {
    console.log('[Upload Profile Image]: ', e);
    response.status(500).json(eR({ msg: 'Internal Server Error' }));
  }
};

export default withUserProtect(countHandler);
