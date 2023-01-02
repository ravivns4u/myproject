import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  errorResponse,
  genericResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import {
  createAProductV2,
  getProductsV2,
  validateProductEntryV2,
} from '../../../../../lib/backend/v2/user-profile/product/updateUserProduct';
import { IProtectMerchantMetaData } from '../../../../../redux/interfaces/backend/apis/commons';
import { InsertionType } from '../../../../../redux/interfaces/backend/apis/v2/common';
import { ICreateProductUser } from '../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';

interface IProductOps {
  firebaseToken: string;
  metadata: IProtectMerchantMetaData;
  serviceStatus: InsertionType;
  uid: string;
  startWith: number;
  endAt: number;
}
export interface IProductOpsGet {
  firebaseToken: string;
  serviceStatus: InsertionType;
  uid: string;
  startWith: number;
  endAt: number;
}

const countHandler: NextApiHandler = async (request, response) => {
  const {
    metadata: { uid },
    serviceStatus,
    startWith,
    endAt,
  } = request.body as IProductOps;
  try {
    const products = await getProductsV2(uid, serviceStatus, startWith, endAt);
    return response
      .status(200)
      .json(genericResponse({ payload: { data: products } }));
  } catch (err) {
    console.log('Error in product-user-get Route: ', err);
    return response
      .status(500)
      .json(errorResponse({ msg: 'Internal Server Error' }));
  }
};

export default withMerchantProtect(countHandler);
