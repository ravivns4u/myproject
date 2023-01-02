import auth, { app, db, analytics, storage } from './firebase_client';

const firebaseClient = {
  auth,
  db,
  app,
  analytics,
  storage,
};

export default firebaseClient;
