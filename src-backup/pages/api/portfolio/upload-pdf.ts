import type { NextApiHandler } from "next";
import Server from "../../../firebase/firebase_server_exports";
import { getAccountApproval } from "../../../firebase/db/accountApproval";
import {
  errorResponse as eR,
  genericResponse as gR,
} from "../../../lib/backend/responseSynthesizer";
import { updatePDF } from "../../../firebase/db/portfolios/pdfUpdate";

const countHandler: NextApiHandler = async (request, response) => {
  /**
   * First Verify Token and then Decode it then to get account approval of user we need to pass uid
   */
  const { payload, firebaseToken, modification } = request.body;
  try {
    const decodedToken = await Server.auth.verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;
    const { merchantSlug, account } = await getAccountApproval(uid);
    if (!account || !merchantSlug) {
      response
        .status(403)
        .json(eR({ msg: "Invalid Request. User not allowed!" }));
      return;
    }
  } catch (er) {
    response.status(401).json(
      eR({
        msg: "Invalid User",
      })
    );
    return;
  }

  /**
   * Inserting File into FireBase
   */
  const updateResponse = await updatePDF(payload, modification);
  if (!updateResponse) {
    response.status(400).json(eR({ msg: "Failed to Upload. Kindly Retry." }));
    return;
  } else response.status(201).json(gR({ msg: "Upload Successful" }));
};

export default countHandler;
