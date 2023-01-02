import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  errorResponse,
  genericResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import { deleteProductV2 } from '../../../../../lib/backend/v2/user-profile/product/updateUserProduct';
import { IProtectMerchantMetaData } from '../../../../../redux/interfaces/backend/apis/commons';

interface IProductOps {
  firebaseToken: string;
  metadata: IProtectMerchantMetaData;
  productLocation: string;
}
export interface IProductOpsDelete {
  firebaseToken: string;
  productLocation: string;
}

const countHandler: NextApiHandler = async (request, response) => {
  const {
    productLocation,
    metadata: { uid },
  } = request.body as IProductOps;
  const { valid, msg } = await deleteProductV2(productLocation, uid);

  if (!valid) return response.status(400).json(errorResponse({ msg }));
  else return response.status(200).json(genericResponse({ msg }));
};

export default withMerchantProtect(countHandler);
