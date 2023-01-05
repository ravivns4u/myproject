import { NextApiHandler } from "next";
import Server from "../../../firebase/firebase_server_exports";
import { getAccountApproval } from "../../../firebase/db/accountApproval";
import {
  errorResponse as eR,
  genericResponse as gR,
} from "../../../lib/backend/responseSynthesizer";
import {getCaption} from '../../../firebase/db/feeds/getCaption';

const countHandler: NextApiHandler = async (req, res) => {
    const { payload, firebaseToken, modification } = req.body;
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

    const Response = await getCaption();
     res.status(201).json(Response);
  };
  
  export default countHandler;