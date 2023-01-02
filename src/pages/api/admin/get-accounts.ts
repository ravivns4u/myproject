import { withAdminProtect } from '../../../lib/backend/middleware/withAdminProtect';
import type { NextApiHandler } from 'next';
import { getAccounts } from '../../../lib/backend/admin/pending-docs';
import { IAccountDetails } from '../../../redux/interfaces/backend/apis/commons';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';
import { endAt } from 'firebase/firestore';

const countHandler: NextApiHandler = async (request, response) => {
  const { isIndividual, inVerified, startWith, endAt } =
    request.body as IAccountDetails;
  const eventsData = await getAccounts(
    isIndividual,
    inVerified,
    startWith,
    endAt
  );
  return response.json(gR({ payload: eventsData }));
};

export default withAdminProtect(countHandler);
