import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  errorResponse,
  genericResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import { eventFormValidate } from '../../../../../lib/backend/v2/user-profile/events/add-events-users';
import { IAddEventValidateRequestFrontend } from '../../../../../redux/interfaces/backend/apis/v2/events';

const countHandler: NextApiHandler = async (request, response) => {
  const { payload } = request.body as IAddEventValidateRequestFrontend;
  const { valid, message } = await eventFormValidate(payload);
  if (valid) {
    return response.status(200).json(genericResponse({ msg: message }));
  } else {
    return response.status(400).json(errorResponse({ msg: message }));
  }
};

export default withMerchantProtect(countHandler);
