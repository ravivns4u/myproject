import type { NextApiHandler } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyUser } from '../../firebase/authentication/auth';
import { registerUserTableData } from '../../firebase/db/firestore';
import type {
  DataSchema,
  ProfessionalAccountType,
} from '../../redux/interfaces/backend/firestore';
import { determineMissingKeysinAnObject } from '../../lib/backend/missingKeys';
import {
  genericResponse as gR,
  errorResponse as eR,
} from '../../lib/backend/responseSynthesizer';
import {
  emailDocsUpdated,
  verifyUserExistence,
} from '../../firebase/db/emailPhoneExists';

interface ExpectedRequest {
  idToken: string;
  data: DataSchema;
  userType: ProfessionalAccountType;
}
export async function getStaticProps() {
  return { props: { isDark: true } };
}
const countHandler: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const keysMissing = determineMissingKeysinAnObject(request.body, [
    'idToken',
    'data',
    'userType',
  ]);
  if (keysMissing.error) {
    response.status(400).json(eR({ msg: keysMissing.msg }));
    return;
  }
  const { idToken, data, userType } = request.body as ExpectedRequest;

  if (!idToken) {
    response.status(401).json({ msg: 'Unauthenticated Input' });
    return;
  }
  const { authenticated, user } = await verifyUser(idToken);
  if (!authenticated || !user) {
    response.status(401).json({ msg: 'Unauthenticated Input' });
    return;
  }
  const { email, phone } = data;
  const existData = await verifyUserExistence(email, phone);
  if (existData.emailExists) {
    response.status(400).json(eR({ msg: 'Email already exists' }));
    return;
  } else if (existData.numberExists) {
    response.status(400).json(eR({ msg: 'Phone number already exists' }));
    return;
  }
  const fbResponse = await registerUserTableData(data, userType);
  // console.log('FB Response = ', await fbResponse, data);
  const updatedStatus = await emailDocsUpdated(email, phone);
  if (!updatedStatus) {
    response.status(500).json(eR({ msg: 'Unexpected Server Error happened.' }));
    return;
  }
  if (fbResponse.error) {
    response.status(401).json(eR({ msg: 'Failed to register user' }));
  } else response.status(200).json(gR({ msg: 'Successfully registered user' }));
};

export default countHandler;
