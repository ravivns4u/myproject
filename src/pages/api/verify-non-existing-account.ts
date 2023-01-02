import type { NextApiHandler } from 'next';
import {
  genericResponse as gR,
  errorResponse as eR,
} from '../../lib/backend/responseSynthesizer';
import { verifyUserExistence } from '../../firebase/db/emailPhoneExists';
import {
  isValidStringField,
  ValidatorTypes,
  validatorTypes,
} from '../../lib/backend/validators';
interface RequestPayload {
  number: string;
  email: string;
}
export async function getStaticProps() {
  return { props: { isDark: true } };
}
interface ResponsePayload {
  numberExists?: boolean;
  emailExists?: boolean;
}
const countHandler: NextApiHandler = async (request, response) => {
  const { number, email } = request.body as RequestPayload;
  //validate Email and Phone Number Before Registration
  const decisionNumber = isValidStringField(
    number,
    validatorTypes.PHONE as ValidatorTypes
  );
  if (!decisionNumber) {
    return response.status(400).json(eR({ msg: 'Invalid Phone Number' }));
  }
  const decisionEmail = isValidStringField(
    email,
    validatorTypes.EMAIL as ValidatorTypes
  );
  if (!decisionEmail) {
    return response.status(400).json(eR({ msg: 'Invalid Email' }));
  }
  const existData = await verifyUserExistence(
    email.toLowerCase(),
    number.trim()
  );

  // ! Exist data
  console.log("existData: ", existData);
  return response.json(gR({ payload: existData as ResponsePayload }));
};

export default countHandler;
