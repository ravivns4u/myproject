import type { NextApiHandler } from 'next';
import { withAdminProtect } from '../../../../../lib/backend/middleware/withAdminProtect';
import { genericResponse } from '../../../../../lib/backend/responseSynthesizer';
import { getAdminProducts } from '../../../../../lib/backend/v2/user-profile/product/updateUserProduct';
import { InsertionType } from '../../../../../redux/interfaces/backend/apis/v2/common';

export interface IAdminEventPayload {
  eventType: InsertionType;
  firebaseToken: string;
  startWith: number;
  endAt: number;
}
const countHandler: NextApiHandler = async (request, response) => {
  const { eventType, startWith, endAt } = request.body as IAdminEventPayload;
  const allProducts = await getAdminProducts(eventType, startWith, endAt);
  return response.json(genericResponse({ payload: allProducts }));
};

export default withAdminProtect(countHandler);
