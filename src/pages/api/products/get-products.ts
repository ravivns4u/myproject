import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../lib/backend/middleware/withMerchantProtect';
import { IGetProducts } from '../../../redux/interfaces/backend/apis/services';
import { getProductByType } from '../../../firebase/db/products/getProducts';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';
const countHandler: NextApiHandler = async (request, response) => {
  const { serviceStatus, uid } = request.body as IGetProducts;
  const services = await getProductByType(serviceStatus, uid);
  return response.json(gR({ payload: services }));
};

export default withMerchantProtect(countHandler);
