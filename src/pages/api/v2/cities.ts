import type { NextApiHandler } from 'next';
import { getCitiesAndStates } from '../../../lib/backend/getCities';
import { genericResponse } from '../../../lib/backend/responseSynthesizer';

const countHandler: NextApiHandler = async (_, response) => {
  const data = getCitiesAndStates();
  response.status(200).json(genericResponse({ payload: data.cities }));
};

export default countHandler;
