import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import type { ReqPayload } from '../../../redux/interfaces/backend/apis/productPortfolio';

import { updateProductPortfolio } from '../../../firebase/db/portfolios/productUpdate';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';
const countHandler: NextApiHandler = async (request, response) => {
  const { payload, firebaseToken, modification, prevDeletions } =
    request.body as ReqPayload;

  try {
    const decodedToken = await Server.auth.verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;
    const { merchantSlug, account } = await getAccountApproval(uid);
    if (!account || !merchantSlug) {
      response
        .status(403)
        .json(eR({ msg: 'Invalid Request. User not allowed!' }));
      return;
    }

    const updateResponse = await updateProductPortfolio(
      payload,
      modification,
      uid,
      prevDeletions
    );
    if (updateResponse.error) {
      console.log(updateResponse);
      response.status(400).json(eR({ msg: updateResponse.message }));
      return;
    } else response.status(201).json(gR({ msg: 'Upload Successful' }));
  } catch (er) {
    console.log('Error = ', er);
    response.status(401).json(
      eR({
        msg: 'Invalid User',
      })
    );
    return;
  }
};

export default countHandler;
