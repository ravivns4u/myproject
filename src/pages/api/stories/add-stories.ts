import { NextApiHandler } from "next";
import Server from "../../../firebase/firebase_server_exports";
import { getAccountApproval } from "../../../firebase/db/accountApproval";
import {
  errorResponse as eR,
  genericResponse as gR,
} from "../../../lib/backend/responseSynthesizer";
import { addStories } from "../../../firebase/db/stories/addStories";

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


  // ADD  Story API
  const Response = await addStories(payload);
  if (!Response) {
    res.status(400).json(eR({ msg: "Failed to Add Story. Kindly Retry." }));
    return;
  } else res.status(201).json(gR({ msg: "Story Added Successfully" }));
};

export default countHandler;
