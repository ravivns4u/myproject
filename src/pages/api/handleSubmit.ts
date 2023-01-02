import type { NextApiHandler } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';
export async function getStaticProps() {
  return { props: { isDark: true } };
}
const countHandler: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  //   const { amount = 1 } = request.body;

  // simulate IO latency
  // await new Promise((resolve) => setTimeout(resolve, 500));

  response.status(200).json({ data: 'success' });
};

export default countHandler;
