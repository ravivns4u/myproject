import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  errorResponse,
  genericResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import {
  createAProductV2,
  deleteExistingFolder,
  modifyProductDetails,
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
  const {
    frontendPayload,
    folderRef,
    metadata: { uid },
  } = request.body as IProductOps;
  // console.log(frontendPayload ,'Front End Payload');
  const { valid, msg } = await modifyProductDetails(frontendPayload, uid);
  if (folderRef !== '-1' && valid) {
    await deleteExistingFolder(folderRef);
  }
  if (!valid) return response.status(400).json(errorResponse({ msg }));
  else return response.status(200).json(genericResponse({ msg }));
};

export default withMerchantProtect(countHandler);
