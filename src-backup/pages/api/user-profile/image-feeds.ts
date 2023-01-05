import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import { getImageFeedsByIndices } from '../../../firebase/db/feeds/feedUpdate';
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
      data: { feeds, uris },
    } = await getImageFeedsByIndices(
      uid,
      startPoint ?? 0,
      endPoint ?? 100
    );
    if (error) return response.status(500).json(eR({}));
    const result = feeds.map((feed, index) => {
      return { ...feed, publicUri: uris[index] };
    });
    response.status(200).json(
      gR({
        payload: {
          user,
          feeds: result,
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
