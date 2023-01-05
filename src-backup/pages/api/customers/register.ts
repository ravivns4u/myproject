import type { NextApiHandler } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyUser } from '../../../firebase/authentication/auth';
import { determineMissingKeysinAnObject } from '../../../lib/backend/missingKeys';
import { FirebaseCustomerSchema } from '../../../redux/interfaces/backend/firestore/registerNewUser';
import {
  genericResponse as gR,
  errorResponse as eR,
} from '../../../lib/backend/responseSynthesizer';
import { registerNewCustomer } from '../../../firebase/db/customers/registerCustomer';
interface ExpectedRequest {
  idToken: string;
  payload: FirebaseCustomerSchema;
}

const countHandler: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const keysMissing = determineMissingKeysinAnObject(request.body, [
    'idToken',
    'payload',
  ]);
  if (keysMissing.error) {
    response.status(400).json(eR({ msg: keysMissing.msg }));
    return;
  }
  const { idToken, payload } = request.body as ExpectedRequest;

  if (!idToken) {
    response.status(401).json({ msg: 'Unauthenticated Input' });
    return;
  }
  const { authenticated, user } = await verifyUser(idToken);
  if (!authenticated || !user) {
    response.status(401).json({ msg: 'Unauthenticated Input' });
    return;
  }
  const fbResponse = await registerNewCustomer(user.uid, payload);
  response.status(200).json(gR({ msg: 'Success' }));
};

export default countHandler;
