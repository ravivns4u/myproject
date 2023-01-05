import type { NextApiHandler } from 'next';
import { withMerchantProtect } from '../../../../../lib/backend/middleware/withMerchantProtect';
import {
  genericResponse,
  errorResponse,
} from '../../../../../lib/backend/responseSynthesizer';
import { deleteEvent } from '../../../../../lib/backend/v2/user-profile/events/add-events-users';
import { IProtectMerchantMetaData } from '../../../../../redux/interfaces/backend/apis/commons';

interface ExpectedGetEventPayload {
  metadata: IProtectMerchantMetaData;
  location: string;
}
export interface DeleteUserEventRequestPayload {
  firebaseToken: string;
  location: string;
}
const countHandler: NextApiHandler = async (request, response) => {
  const {
    metadata: { uid },

    location,
  } = request.body;

  try {
    let deleteUid: string = '';
    let dataLocation: string = ''
    if(location.deleteOperationType === 'images') {
      deleteUid = location.imagePath?.split('/')?.[4] ?? '';    
      dataLocation = location.imagePath
    } else {
      deleteUid = location?.split('/')?.[5] ?? '';
      dataLocation = location;
    }

    if (uid) {
      await deleteEvent(dataLocation);
      return response
        .status(200)
        .json(genericResponse({ msg: 'Deletion Success' }));
    } else {
      return response
        .status(400)
        .json(errorResponse({ msg: 'Not Authorized' }));
    }
  } catch (error) {
    console.log('Error = ', error);
    return response.status(500).json(errorResponse({ msg: `${error}` }));
  }
};

export default withMerchantProtect(countHandler);
