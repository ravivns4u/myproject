import type { NextApiHandler } from 'next';
import { withAdminProtect } from '../../../../../lib/backend/middleware/withAdminProtect';
import { genericResponse } from '../../../../../lib/backend/responseSynthesizer';
import { markEvent } from '../../../../../lib/backend/v2/admin/events/get-events-admin';

export interface IAdminEventApprovePayload {
  firebaseToken: string;
  inVerified: boolean;
  location: string;
}
const countHandler: NextApiHandler = async (request, response) => {
  const { inVerified, location } = request.body as IAdminEventApprovePayload;
  const decision = await markEvent(inVerified, location);
  if (decision)
    return response.status(201).json(genericResponse({ payload: decision }));
  return response.status(400).json(genericResponse({ payload: decision }));
};

export default withAdminProtect(countHandler);
