import type { NextApiHandler } from 'next';
import { comparitors } from '../../../../../components/Profile/Body/SubModules/constants/comparitors';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  errorResponse,
  genericResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import { createEvent } from '../../../../../lib/backend/v2/user-profile/events/add-events-users';
import { IProtectMerchantMetaData } from '../../../../../redux/interfaces/backend/apis/commons';
import { IAddEventFrontend } from '../../../../../redux/interfaces/backend/apis/v2/events';

interface ExpectedCreatePayload {
  payload: IAddEventFrontend;
  create: boolean;
  metadata: IProtectMerchantMetaData;
}
export interface CreateEventRequestPayload {
  payload: IAddEventFrontend;
  create: boolean;
  firebaseToken: string;
}
const countHandler: NextApiHandler = async (request, response) => {
  const {
    payload,
    create,
    metadata: { user, uid },
  } = request.body as ExpectedCreatePayload;
  const { done, message } = await createEvent(
    uid,
    payload,
    create,
    user.displayName,
    false,
    comparitors.PENDING
  );
  if (done) {
    return response.status(201).json(genericResponse({}));
  }
  return response.status(400).json(errorResponse({ msg: message }));
};

export default withMerchantProtect(countHandler);
