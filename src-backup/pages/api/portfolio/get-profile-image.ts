import type { NextApiHandler } from 'next';
import { getProfileImage } from '../../../firebase/db/portfolios/profileImages';

import {
  genericResponse as gR,
  errorResponse as eR,
} from '../../../lib/backend/responseSynthesizer';

export interface IGetImage {
  uid: string;
}
const countHandler: NextApiHandler = async (request, response) => {
  const { uid } = request.body as IGetImage;

  try {
    const loc = await getProfileImage(uid);
    if (loc !== 'invalid-url') {
      return response.json(gR({ payload: loc }));
    } else return response.status(400).json(eR({ payload: 'invalid-url' }));
  } catch (e) {
    console.log('[Upload Profile Image]: ', e);
    return response.status(500).json(eR({ msg: 'Internal Server Error' }));
  }
};

export default countHandler;
