import type { NextApiHandler } from 'next';
import { getPublicDp } from '../../../firebase/public/getUserPortfolio';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';
export const PortfolioOps = {
  IMAGES: 'images',
  EVENTS: 'events',
  SERVICES: 'services',
  PRODUCTS: 'products',
};

interface Payload {
  userSlug: string;
}

const countHandler: NextApiHandler = async (request, response) => {
  const { userSlug } = request.body as Payload;
  const uri = await getPublicDp(userSlug);
  return response.json(gR({ payload: uri }));
};

export default countHandler;
