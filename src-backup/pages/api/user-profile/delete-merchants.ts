import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';
import { deleteMerchant } from '../../../firebase/db/portfolios/deleteFiles';
import type {
  DeletePointer,
  DeleteRequest,
} from '../../../redux/interfaces/backend/apis/deleteInterfaces';

const countHandler: NextApiHandler = async (request, response) => {
  const { firebaseToken, data } = request.body as DeleteRequest;
  try {
    const decodedToken = await Server.auth.verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;
    const { merchantSlug, account, user } = await getAccountApproval(uid);
    if (!account || !merchantSlug) {
      response
        .status(403)
        .json(eR({ msg: 'Invalid Request. User not allowed !' }));
      return;
    }
    const result = (await deleteMerchant({
      ...(data as DeletePointer),
      uid,
    })) as {
      error: boolean;
    };
console.log(result,"result  ")
    if (result.error) {
      response
        .status(401)
        .json(eR({ msg: 'Invalid Request. User not allowed!' }));
      return;
    }
    response.status(200).json(gR({}));
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
