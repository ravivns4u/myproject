import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import type { ReqPayload } from '../../../redux/interfaces/backend/apis/ImageFeed';

import { updateImageFeed } from '../../../firebase/db/feeds/feedUpdate';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';
const countHandler: NextApiHandler = async (request, response) => {
  const { payload, firebaseToken, modification } = request.body as ReqPayload;

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
  } catch (er) {
    response.status(401).json(
      eR({
        msg: 'Invalid User',
      })
    );
    return;
  }

  const updateResponse = await updateImageFeed(payload, modification);
  if (!updateResponse) {
    response.status(400).json(eR({ msg: 'Failed to Upload. Kindly Retry.' }));
    return;
  } else response.status(201).json(gR({ msg: 'Upload Successful' }));
};

export default countHandler;
