import Server from '../firebase_server_exports';

export const verifyUser = async (idToken: string) => {
  try {
    const decodedToken = await Server.auth.verifyIdToken(idToken);
    //Server.auth.setCustomUserClaims(decodedToken.uid, { adminApproval: })

    return {
      authenticated: true,
      user: decodedToken,
    };
  } catch (e) {
    console.log('Error = ', e);
    return { authenticated: false, user: null };
  }
};

// export { verifyUser };
