import * as admin from "firebase-admin";
import { Provider } from "@nestjs/common";
import { env } from "../common/env";

let firebaseApp: admin.app.App;

const FirebaseAdminProvider: Provider = {
  provide: "FirebaseAdmin",
  useFactory: () => {
    if (!firebaseApp) {
      try {
        firebaseApp = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: env.FIREBASE_PRIVATE_KEY,
          }),
        });
      } catch (error) {
        console.error("Firebase Admin initialization error", error);
        throw error;
      }
    }
    return admin;
  },
};

export { FirebaseAdminProvider };
