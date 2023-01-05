import type { NextApiHandler } from 'next';
import { checkServiceValidity } from '../../../../../firebase/db/portfolios/serviceUpdate';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  errorResponse,
  genericResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import { IProtectMerchantMetaData } from '../../../../../redux/interfaces/backend/apis/commons';
import { ServiceRequestForm } from '../../../../../redux/interfaces/backend/apis/servicePortfolio';

interface IUserPayload {
  metadata: IProtectMerchantMetaData;
  payload: ServiceRequestForm;
  modification: boolean;
  isService: boolean;
}
export interface IServiceFrontendValidation {
  payload: ServiceRequestForm;
  firebaseToken: string;
  modification: boolean;
  isService: boolean;
}
const countHandler: NextApiHandler = async (request, response) => {
  const { metadata, payload, modification } = request.body as IUserPayload;
  const { valid, message } = await checkServiceValidity(
    payload,
    '',
    metadata.user.uid,
    metadata.user.displayName,
    '',
    modification,
    'User'
  );
  if (valid) {
    return response.status(200).json(
      genericResponse({
        msg: 'Good to Procceed',
        payload: { valid, message },
      })
    );
  }
  return response
    .status(400)
    .json(errorResponse({ payload: { valid, message } }));
};

export default withMerchantProtect(countHandler);
