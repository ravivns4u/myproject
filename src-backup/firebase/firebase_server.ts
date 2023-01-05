import * as admin from "firebase-admin";

if (!admin.apps.length){
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (privateKey === "") {
    console.log("FIREBASE_PRIVATE_KEY is not set");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey
    })
  });
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { auth, db, storage };

//To Add other Details:
//https://stackoverflow.com/questions/38389341/firebase-create-user-with-email-password-display-name-and-photo-url
//User specific Rules: https://stackoverflow.com/questions/57680416/firestore-rules-how-to-make-user-can-only-read-write-to-document-with-their-name
// Email Address = database-type
