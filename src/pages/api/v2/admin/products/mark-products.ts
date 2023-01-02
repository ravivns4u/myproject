import type { NextApiHandler } from 'next';
import { withAdminProtect } from '../../../../../lib/backend/middleware/withAdminProtect';
import { genericResponse } from '../../../../../lib/backend/responseSynthesizer';
import { markAdminProduct } from '../../../../../lib/backend/v2/user-profile/product/updateUserProduct';

export interface IAdminProductMarkPayload {
  inVerified: boolean;
  firebaseToken: string;
  productId: string;
}
const countHandler: NextApiHandler = async (request, response) => {
  const { inVerified, productId } = request.body as IAdminProductMarkPayload;
  const { valid, msg } = await markAdminProduct(productId, inVerified);
  if (valid) return response.json(genericResponse({ payload: msg }));
  else return response.status(400).json(genericResponse({ payload: msg }));
};

export default withAdminProtect(countHandler);
