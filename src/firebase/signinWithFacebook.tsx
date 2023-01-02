import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";



const signInWithFacebookId = async () => {
  const provider = new FacebookAuthProvider();

const auth = getAuth();
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      //The token of the firebase
      const token = await result.user.getIdToken();
      return { status: true, accessToken: token };
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      return { status: false };
      // ...
    });
};

export default signInWithFacebookId;
