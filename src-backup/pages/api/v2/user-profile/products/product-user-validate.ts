import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  errorResponse,
  genericResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import { validateProductEntryV2 } from '../../../../../lib/backend/v2/user-profile/product/updateUserProduct';
import { IProtectMerchantMetaData } from '../../../../../redux/interfaces/backend/apis/commons';
import { ICreateProductUser } from '../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';

interface IProductOps {
  firebaseToken: string;
  metadata: IProtectMerchantMetaData;
  frontendPayload: ICreateProductUser;
}
export interface IProductOpsValidate {
  firebaseToken: string;
  frontendPayload: ICreateProductUser;
}

const countHandler: NextApiHandler = async (request, response) => {
  const { frontendPayload } = request.body as IProductOps;
  const { valid, msg } = await validateProductEntryV2(frontendPayload);
  if (!valid) return response.status(400).json(errorResponse({ msg }));
  else return response.status(200).json(genericResponse({ msg }));
};

export default withMerchantProtect(countHandler);
