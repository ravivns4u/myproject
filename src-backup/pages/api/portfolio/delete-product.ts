import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import { deleteProductPortfolio } from '../../../firebase/db/portfolios/productUpdate';
import {
  DeleteProductPointer,
  DeleteRequest,
} from '../../../redux/interfaces/backend/apis/deleteInterfaces';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';

const countHandler: NextApiHandler = async (request, response) => {
  const { firebaseToken, data } = request.body as DeleteRequest;

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

    const products = await deleteProductPortfolio(
      data as DeleteProductPointer,
      uid
    );
    if (products.error) {
      response.status(400).json(eR({ msg: 'Deletion Failed, Kindly Retry' }));
      return;
    } else {
      response.status(201).json(gR({ msg: 'Deletion Successful' }));
      return;
    }
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
