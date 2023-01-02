import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import type { ServiceRequestPayload } from '../../../redux/interfaces/backend/apis/servicePortfolio';
import { updateServicePortfolio } from '../../../firebase/db/portfolios/serviceUpdate';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';
import { getPublicDpLocation } from '../../../firebase/public/getUserPortfolio';

const countHandler: NextApiHandler = async (request, response) => {
  const { payload, firebaseToken, modification, isService } =
    request.body as ServiceRequestPayload;

  try {
    const decodedToken = await Server.auth.verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;
    const { merchantSlug, account, user } = await getAccountApproval(uid);
    if (!account || !merchantSlug || !user) {
      response
        .status(403)
        .json(eR({ msg: 'Invalid Request. User not allowed!' }));
      return;
    }
    const dp = await getPublicDpLocation(uid);
    const updateResponse = await updateServicePortfolio(
      payload,
      modification,
      uid,
      isService,
      user.displayName,
      dp
    );

    if (!updateResponse) {
      response.status(400).json(eR({ msg: 'Failed to Upload. Kindly Retry.' }));
      return;
    } else response.status(201).json(gR({ msg: 'Upload Successful' }));
    return;
  } catch (er) {
    const err = er as { code: string };
    console.log('Eror = ', err.code === 'auth/id-token-expired');
    response.status(401).json(
      eR({
        msg: 'Invalid User',
        isLoggedOut: err.code === 'auth/id-token-expired',
      })
    );
    return;
  }
};

export default countHandler;
