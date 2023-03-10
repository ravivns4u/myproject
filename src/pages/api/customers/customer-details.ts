import type { NextApiHandler } from "next";
import type { UserFirebasePayload } from "../../../redux/interfaces";
import Server from "../../../firebase/firebase_server_exports";
import {
  genericResponse as gR,
  errorResponse as eR,
} from "../../../lib/backend/responseSynthesizer";
import { getAccountApproval } from "../../../firebase/db/customers/accountApproval";
import { UserState } from "../../../redux/interfaces";
import {
  CombinedUserCompanySchema,
  CustomerState,
} from "../../../redux/interfaces/frontend/user";
import { database } from "firebase-admin";
import { constDocumentRefs } from "../../../firebase/constants/firestore";
// export async function getStaticProps() {
//   return { props: { isDark: true } };
// }
const countHandler: NextApiHandler = async (request, response) => {
  const { firebaseToken } = request.body as UserFirebasePayload;
  try {
    const decodedToken = await Server.auth.verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;
    const isEmailValid = (decodedToken.email_verified = true);
    const displayName = decodedToken.name;
    const photoURL = decodedToken.picture ?? "/portfolio/person.png";
    const email = decodedToken.email;
    let { adminApproved, customerSlug, account, user } =
      await getAccountApproval(uid);
    if (!account || !customerSlug) {
      response.status(403).json(eR({ msg: "Invalid Request" }));
      return;
    }
    if (email) {
      let returnPayload: CustomerState = {
        isLoggedIn: true,
        email,
        uid,
        displayName,
        photoURL,
        emailVerified: isEmailValid ?? false,
        firebaseToken,
        adminApproved,
        customerSlug: customerSlug ?? "",
        user: user ?? ({} as any),
        phone: "",
        dob: "",
        isAdmin: user?.isAdmin ?? false,
      };
      // if(user.plan && user.plan === 'pro' && new Date(user?.subscriptionEndDate) < currentDate) {
      // const obj = {
      //   uid: user?.uid,
      //   ref: `${constDocumentRefs.users_verified}`,
      // };
      // returnPayload = {
      //   isLoggedIn: true,
      //   email,
      //   uid,
      //   displayName,
      //   photoURL,
      //   emailVerified: isEmailValid ?? false,
      //   firebaseToken,
      //   adminApproved,
      //   customerSlug: customerSlug ?? "",
      //   user: user ?? ({} as any),
      //   phone: "",
      //   dob: "",
      //   isAdmin: user?.isAdmin ?? false,
      // };
      // }

      response.status(200).json(
        gR({
          payload: returnPayload,
        })
      );
    } else
      response
        .status(400)
        .json(eR({ msg: "Email not found for the given account" }));
  } catch (e) {
    console.log(e);
    response.status(401).json(
      eR({
        msg: "Invalid User",
      })
    );
  }
};

const checkSubscription = async (data: any) => {
  try {
    const uid = data.uid;
    const ref = data.ref;
    const feedCollection = Server.db.collection(ref);
    const playload = {
      modifiedAt: new Date().toISOString(),
      plan: "basic",
      subscriptionEndDate: "",
      subscriptionStartDate: new Date().toISOString(),
      subscribed: true,
      subscription: false,
    };
    await feedCollection.doc(uid).update(playload);
    return true;
  } catch (error) {
    console.log(error, "Error");
    return false;
  }
};

export default countHandler;
