import { withAdminProtect } from '../../../lib/backend/middleware/withAdminProtect';
import type { NextApiHandler } from 'next';
import { markEvents } from '../../../lib/backend/admin/pending-docs';
import { IUserApproveEvents } from '../../../redux/interfaces/backend/apis/commons';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';

const countHandler: NextApiHandler = async (request, response) => {
  const { inVerified, eventLocations } = request.body as IUserApproveEvents;
  await markEvents(inVerified, eventLocations);
  return response.json(gR({}));
};

export default withAdminProtect(countHandler);
