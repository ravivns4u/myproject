import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import { AdminUsers } from '../../../redux/interfaces/backend/apis/commons';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import { errorResponse as eR } from '../../../lib/backend/responseSynthesizer';

export const withAdminProtect = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const { firebaseToken } = request.body as AdminUsers;
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
      const isAdmin = user?.isAdmin ?? false;
      if (!isAdmin) {
        response
          .status(401)
          .json(eR({ payload: { isAdmin: false }, msg: 'Invalid Admin User' }));
        return;
      }
      try {
        return handler(request, response);
      } catch (e) {
        console.log('Error = ', e);
        return response.status(500).json(eR({ msg: 'Internal Server Error' }));
      }
    } catch (e) {
      console.log('Error = ', e);
      return response.status(401).json(eR({ msg: 'Non Authenticated User' }));
    }
  };
};
