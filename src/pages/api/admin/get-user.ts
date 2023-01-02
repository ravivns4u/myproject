import { withAdminProtect } from '../../../lib/backend/middleware/withAdminProtect';
import type { NextApiHandler } from 'next';
import { IUserDetails } from '../../../redux/interfaces/backend/apis/commons';
import {
  errorResponse as eR,
  genericResponse as gR,
} from '../../../lib/backend/responseSynthesizer';
import { getUserDetailsfromUID } from '../../../firebase/db/admin/getUserByUid';
const countHandler: NextApiHandler = async (request, response) => {
  const { uid } = request.body as IUserDetails;
  const userData = await getUserDetailsfromUID(uid);
  if (userData.length === 0)
    return response.json(eR({ msg: 'User not found' }));
  return response.json(gR({ payload: userData }));
};

export default withAdminProtect(countHandler);
