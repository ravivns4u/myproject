import type { NextApiHandler } from "next";
import { genericResponse } from "../../../../lib/backend/responseSynthesizer";
import { fetchCategories } from "../../../../lib/backend/v2/utils/fetchers";
import { ICategoryMap } from "../../../../redux/interfaces/backend/apis/v2/common";

import Server from "../../../../firebase/firebase_server_exports";

import { constDocumentRefs } from "../../../../firebase/constants/firestore";

export async function getStaticProps() {
  return { props: { isDark: true } };
}

const countHandler: NextApiHandler = async (_, response) => {
  console.log("fetching language from the index.ts------ start", process.env.NODE_ENV);
  const languages = await fetchCategories().then((data) => data);
  console.log("fetching language from the index.ts------ end", languages);

  response.status(200).json(genericResponse({payload: languages}));
};

export default countHandler;
