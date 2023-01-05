import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import { getImagePortfoliosByIndices } from '../../../firebase/db/portfolios/portfolioUpdate';
import { getServiceOrEventsByPendingByIndices } from '../../../firebase/db/portfolios/serviceUpdate';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';
interface userDetails {
  firebaseToken: string;
  startPoint: number;
  endPoint: number;
}

const countHandler: NextApiHandler = async (request, response) => {
  const { firebaseToken, startPoint, endPoint } = request.body as userDetails;
  try {
    const decodedToken = await Server.auth.verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;
    const { merchantSlug, account, user } = await getAccountApproval(uid);
    if (!account || !merchantSlug) {
      response
        .status(403)
        .json(eR({ msg: 'Invalid Request. User not allowed!' }));
      return;
    }

    const {
      error,
      data: { portfolios, uris },
    } = await getImagePortfoliosByIndices(
      uid,
      startPoint ?? 0,
      endPoint ?? 100
    );
    if (error) return response.status(500).json(eR({}));
    const result = portfolios.map((portfolio, index) => {
      return { ...portfolio, publicUri: uris[index] };
    });
    response.status(200).json(
      gR({
        payload: {
          user,
          portfolios: result,
        },
      })
    );
  } catch (er) {
    response.status(401).json(
      eR({
        msg: 'Invalid User',
      })
    );
    return;
  }
};

export default countHandler;
