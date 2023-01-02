import type { NextApiHandler } from 'next';
import { withAdminProtect } from '../../../../../lib/backend/middleware/withAdminProtect';
import { genericResponse } from '../../../../../lib/backend/responseSynthesizer';
import { addEventCategories } from '../../../../../lib/backend/v2/admin/add-categories';

export interface IUpdateCategories {
  categories: string[];
  firebaseToken: string;
}
const countHandler: NextApiHandler = async (request, response) => {
  const { categories } = request.body as IUpdateCategories;
  const result = await addEventCategories(categories);
  if (result)
    return response.status(201).json(genericResponse({ msg: 'Success' }));
  else response.status(400).json({ msg: 'Failed' });
};

export default withAdminProtect(countHandler);
