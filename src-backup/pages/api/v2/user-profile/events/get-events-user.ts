import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  genericResponse,
  errorResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import { getEvents } from '../../../../../lib/backend/v2/user-profile/events/add-events-users';
import { IProtectMerchantMetaData } from '../../../../../redux/interfaces/backend/apis/commons';
import { InsertionType } from '../../../../../redux/interfaces/backend/apis/v2/common';

interface ExpectedGetEventPayload {
  create: boolean;
  metadata: IProtectMerchantMetaData;
  startAt: number;
  endAt: number;
  location: InsertionType;
}
export interface GetUserEventRequestPayload {
  firebaseToken: string;
  startAt: number;
  endAt: number;
  location: InsertionType;
}
const countHandler: NextApiHandler = async (request, response) => {
  const {
    metadata: { uid },
    startAt,
    endAt,
    location,
  } = request.body as ExpectedGetEventPayload;

  try {
    const eventsArray = await getEvents(uid, location, startAt, endAt);
    return response.status(200).json(genericResponse({ payload: eventsArray }));
  } catch (error) {
    console.log('Error = ', error);
    return response.status(500).json(errorResponse({ msg: `${error}` }));
  }
};

export default withMerchantProtect(countHandler);
