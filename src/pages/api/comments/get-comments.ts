import { NextApiHandler } from "next";
import Server from "../../../firebase/firebase_server_exports";
import { getAccountApproval } from "../../../firebase/db/accountApproval";
import {
  errorResponse as eR,
  genericResponse as gR,
} from "../../../lib/backend/responseSynthesizer";
import { getComments } from "../../../firebase/db/comments/getComments";

const countHandler: NextApiHandler = async (req, res) => {
  const {firebaseToken } = req.body;
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


  // GET Comments API
  const Response = await getComments();
    res.status(201).json(Response);
};

export default countHandler;