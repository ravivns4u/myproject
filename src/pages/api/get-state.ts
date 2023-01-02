import type { NextApiHandler } from 'next';
import { getStateFromCity } from '../../lib/backend/getCities';
export async function getStaticProps() {
  return { props: { isDark: true } };
}
const countHandler: NextApiHandler = async (request, response) => {
  const { city } = request.body as { city: string };

  const state = getStateFromCity(city);

  return response.json({ state });
};

export default countHandler;
