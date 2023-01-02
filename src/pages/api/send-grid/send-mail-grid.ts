import { NextApiHandler } from "next";
import Server from "../../../firebase/firebase_server_exports";
import { getAccountApproval } from "../../../firebase/db/accountApproval";
import {
  errorResponse as eR,
  genericResponse as gR,
} from "../../../lib/backend/responseSynthesizer";
import { editContactInfo } from "../../../firebase/db/payments/editContactInfo";
import { sendEmailToSendGrid } from "../../../firebase/db/send-grid/sendGrid";

const countHandler: NextApiHandler = async (req, res) => {
  const { payload, firebaseToken } = req.body;
  try {
    const decodedToken = await Server.auth.verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;
    const { merchantSlug, account } = await getAccountApproval(uid);
    if (!account || !merchantSlug) {
      res.status(403).json(eR({ msg: "Invalid Request. User not allowed!" }));
      return;
    }
  } catch (er) {
    res.status(401).json(
      eR({
        msg: "Invalid User",
      })
    );
    return;
  }

  //   Send Mai To Send Grid API
  const Response = await sendEmailToSendGrid(payload);
  if (!Response) {
    res
      .status(400)
      .json(eR({ msg: "Failed to send Mail. Kindly Retry." }));
    return;
  } else res.status(201).json(gR({ msg: "Mail Sent Successfully" }));
};

export default countHandler;
