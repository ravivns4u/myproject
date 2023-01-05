import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Server from '../../../firebase/firebase_server_exports';
import {
  AdminUsers,
  IProtectMerchantMetaData,
} from '../../../redux/interfaces/backend/apis/commons';
import { getAccountApproval } from '../../../firebase/db/accountApproval';
import { errorResponse as eR } from '../../../lib/backend/responseSynthesizer';

export const withMerchantProtect = (handler: NextApiHandler) => {
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
      const isMerchant = user?.userType === 'Professionals';
      if (!isMerchant) {
        response
          .status(401)
          .json(
            eR({ payload: { isMerchant: false }, msg: 'Invalid Merchant User' })
          );
        return;
      }
      try {
        const metadata = { uid, user: user } as IProtectMerchantMetaData;
        const newBody = { ...request.body, metadata };
        request.body = newBody;
        return handler(request, response);
      } catch (e) {
        return response.status(500).json(eR({ msg: 'Internal Server Error' }));
      }
    } catch (e) {
      const errorObj = e as { code: string };
      console.log('Error = ', errorObj);
      if (errorObj.code === 'auth/id-token-expired') {
        return response.status(401).json(
          eR({
            msg: 'Login Session Expired, Please Login again to continue!',
            payload: { sessionExpired: true },
          })
        );
      }
      return response.status(500).json(
        eR({
          msg: 'Unexpected Server Error Happened in Merchant Protect Profile!',
        })
      );
    }
  };
};
