import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  errorResponse,
  genericResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import {
  createAProductV2,
  validateProductEntryV2,
} from '../../../../../lib/backend/v2/user-profile/product/updateUserProduct';
import { IProtectMerchantMetaData } from '../../../../../redux/interfaces/backend/apis/commons';
import { ICreateProductUser } from '../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';

interface IProductOps {
  firebaseToken: string;
  metadata: IProtectMerchantMetaData;
  frontendPayload: ICreateProductUser;
  folderRef: string;
}
export interface IProductOpsCreate {
  firebaseToken: string;
  frontendPayload: ICreateProductUser;
  folderRef: string;
}

const countHandler: NextApiHandler = async (request, response) => {
  const { frontendPayload, metadata, folderRef } = request.body as IProductOps;
  const { valid, msg } = await createAProductV2(
    frontendPayload,
    metadata.uid,
    folderRef,
    metadata.user.displayName
  );
  if (!valid) return response.status(400).json(errorResponse({ msg }));
  else return response.status(200).json(genericResponse({ msg }));
};

export default withMerchantProtect(countHandler);
