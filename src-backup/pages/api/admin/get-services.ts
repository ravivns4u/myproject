import { withAdminProtect } from '../../../lib/backend/middleware/withAdminProtect';
import type { NextApiHandler } from 'next';
import { getServices } from '../../../lib/backend/admin/pending-docs';
import { IUserEvents } from '../../../redux/interfaces/backend/apis/commons';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';

const countHandler: NextApiHandler = async (request, response) => {
  const { eventType, startWith, endAt } = request.body as IUserEvents;
  try {
    const eventsData = await getServices(eventType, startWith, endAt);
    return response.json(gR({ payload: eventsData }));
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Failed');
  }
};

export default withAdminProtect(countHandler);
