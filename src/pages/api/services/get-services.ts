import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../lib/backend/middleware/withMerchantProtect';
import { IGetService } from '../../../redux/interfaces/backend/apis/services';
import { getServiceByType } from '../../../firebase/db/services/getServices';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';
const countHandler: NextApiHandler = async (request, response) => {
  const { serviceStatus, uid, isEvent, startWith, endAt } =
    request.body as IGetService;
  const services = await getServiceByType(
    serviceStatus,
    uid,
    isEvent,
    startWith,
    endAt
  );
  return response.json(gR({ payload: services }));
};

export default withMerchantProtect(countHandler);
