import type { NextApiHandler } from 'next';
import { constDocumentRefs } from '../../firebase/constants/firestore';
import Server from '../../firebase/firebase_server_exports';
export async function getStaticProps() {
  return { props: { isDark: true } };
}
import {
  getUidFromSlug,
  getUserEventsBySlug,
  getUserImages,
  getUserServicesBySlug,
  slugUIdMap,
} from '../../firebase/public/getUserPortfolio';
import {
  getAdminEvents,
  getData,
} from '../../lib/backend/v2/admin/events/get-events-admin';
import { fetchCategories } from '../../lib/backend/v2/utils/fetchers';
const countHandler: NextApiHandler = async (request, response) => {
  if (
    process.env.NODE_TEST_ENV &&
    process.env.NODE_TEST_ENV !== 'development'
  ) {
    response.status(404).json({ error: true, message: 'Not found' });
    return;
  }
  const { operationType, operationProps } = request.body;
  switch (operationType) {
    case 'moveFromUid':
      return response.json({
        error: false,
        result: await moveFromUid(operationProps),
      });
    case 'slugUIdMap': {
      return response.json({
        error: false,
        result: await slugUIdMap(operationProps.slug, operationProps.uid),
      });
    }
    case 'getUserImages': {
      return response.json({
        error: false,
        result: await getUserServicesBySlug(operationProps, 0, 1),
      });
    }

    case 'testCategories': {
      return response.json({
        error: false,
        result: await getData(),
      });
    }
    default: {
      response
        .status(200)
        .json({ error: true, message: 'Undefined Operation' });
      return;
    }
  }
};

export default countHandler;

type IStatus = 'pending' | 'verified' | 'rejected';
export const moveFromUid = async (operationProps: {
  uid: string;
  fromPath: IStatus;
  toPath: IStatus;
  deletePrevious: boolean;
}) => {
  try {
    const { uid, fromPath, toPath, deletePrevious } = operationProps;
    const fromPoint = `${constDocumentRefs.users}/${fromPath}/${uid}`;
    const document = (await Server.db.doc(fromPoint).get()).data();
    const toPoint = `${constDocumentRefs.users}/${toPath}/${uid}`;

    if (document) await Server.db.doc(toPoint).set(document, { merge: true });
    if (deletePrevious) await Server.db.doc(fromPoint).delete();
    return true;
  } catch (e) {
    return false;
  }
};
