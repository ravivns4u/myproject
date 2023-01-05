import type { NextApiHandler } from "next";
import { getCitiesAndStates } from "../../lib/backend/getCities";

export async function getStaticProps() {
  return { props: { isDark: true } };
}
const countHandler: NextApiHandler = async (_, response) => {
  const data = getCitiesAndStates();
  response.status(200).json(data);
};

export default countHandler;
