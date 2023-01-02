import type { NextApiHandler } from 'next';
import { fetchCategories } from '../../../../lib/backend/v2/utils/fetchers';
import { ICategoryMap } from '../../../../redux/interfaces/backend/apis/v2/common';

const categories = fetchCategories().then((data) => data as ICategoryMap);
const countHandler: NextApiHandler = async (_, response) => {
  return response.json((await categories).events);
};

export default countHandler;
