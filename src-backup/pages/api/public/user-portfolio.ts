import type { NextApiHandler } from 'next';
import {
  getUserEventsBySlug,
  getUserImages,
  getUserServicesBySlug,
} from '../../../firebase/public/getUserPortfolio';
import { genericResponse as gR } from '../../../lib/backend/responseSynthesizer';
export const PortfolioOps = {
  IMAGES: 'images',
  EVENTS: 'events',
  SERVICES: 'services',
  PRODUCTS: 'products',
};

interface Payload {
  userSlug: string;
  portfolioType: 'images' | 'events' | 'services' | 'products';
  startFrom: number;
  endFrom: number;
}

const countHandler: NextApiHandler = async (request, response) => {
  const { userSlug, portfolioType, startFrom, endFrom } =
    request.body as Payload;
  switch (portfolioType) {
    case PortfolioOps.IMAGES: {
      const result = await getUserImages(userSlug, startFrom, endFrom);
      return response.json(gR({ payload: result }));
    }
    case PortfolioOps.EVENTS: {
      const result = await getUserEventsBySlug(userSlug, startFrom, endFrom);
      return response.json(gR({ payload: result }));
    }
    case PortfolioOps.SERVICES: {
      const result = await getUserServicesBySlug(userSlug, startFrom, endFrom);
      return response.json(gR({ payload: result }));
    }
    default:
      return response.json(gR({ payload: [] }));
  }
};

export default countHandler;
