import { NextApiHandler } from "next";
import Server from "../../../firebase/firebase_server_exports";
import { getAccountApproval } from "../../../firebase/db/accountApproval";
import {
  errorResponse as eR,
  genericResponse as gR,
} from "../../../lib/backend/responseSynthesizer";
import { editContactInfo } from "../../../firebase/db/payments/editContactInfo";

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

  //   Edit Contact Info API
  const Response = await editContactInfo(payload);
  if (!Response) {
    res
      .status(400)
      .json(eR({ msg: "Failed to Edit Contact Info. Kindly Retry." }));
    return;
  } else res.status(201).json(gR({ msg: "Contact Info Upated Successfully" }));
};

export default countHandler;
