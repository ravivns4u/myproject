import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import type { GetPortfolioPayload } from '../../../redux/interfaces/backend/apis/productPortfolio';

import { getProductByIndices } from '../../../firebase/db/portfolios/productUpdate';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';

const countHandler: NextApiHandler = async (request, response) => {
  const { firebaseToken, startIndex, endIndex } =
    request.body as GetPortfolioPayload;

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

    const products = await getProductByIndices(uid, startIndex, endIndex);
    // console.log(products.data[0].images[0]);
    if (products.error) {
      response
        .status(400)
        .json(eR({ msg: 'Failed to Fetch the Data. Kindly Retry.' }));
      return;
    } else {
      response.status(201).json(gR({ payload: products.data }));
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
