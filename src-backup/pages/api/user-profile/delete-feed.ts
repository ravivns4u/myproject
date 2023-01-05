import type { NextApiHandler } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import { deleteImageFeed } from '../../../firebase/db/feeds/feedUpdate';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';
import type { ImageFeedData } from '../../../redux/interfaces/backend/apis/ImageFeed';
interface userDetails {
  firebaseToken: string;
  feedDetails: ImageFeedData;
}

const countHandler: NextApiHandler = async (request, response) => {
  const { firebaseToken, feedDetails } = request.body as userDetails;
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
    const result = (await deleteImageFeed(feedDetails)) as {
      error: boolean;
    };

    if (result.error) {
      response
        .status(403)
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
