import { withAdminProtect } from '../../../lib/backend/middleware/withAdminProtect';
import type { NextApiHandler } from 'next';
import { getProducts } from '../../../lib/backend/admin/pending-docs';
import { IUserEvents } from '../../../redux/interfaces/backend/apis/commons';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';

const countHandler: NextApiHandler = async (request, response) => {
  const { eventType, startWith, endAt } = request.body as IUserEvents;
  const productsData = await getProducts(eventType, startWith, endAt);
  return response.json(gR({ payload: productsData }));
};

export default withAdminProtect(countHandler);
