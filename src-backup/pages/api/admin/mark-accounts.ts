import { withAdminProtect } from '../../../lib/backend/middleware/withAdminProtect';
import type { NextApiHandler } from 'next';
import { approveAccounts } from '../../../lib/backend/admin/pending-docs';
import { IMarkAccounts } from '../../../redux/interfaces/backend/apis/commons';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';

const countHandler: NextApiHandler = async (request, response) => {
  const { inVerified, uids } = request.body as IMarkAccounts;
  const result = await approveAccounts(inVerified, uids);
  return response.json(gR({ payload: result }));
};

export default withAdminProtect(countHandler);
