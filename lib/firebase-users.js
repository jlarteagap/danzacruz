// lib/firebase-adapter.js (versión con auth de servicio)
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializar Firebase Admin (solo para el adaptador)
let adminApp;
if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
        /\\\\n/g,
        "\\n"
      ),
    }),
  });
} else {
  adminApp = getApps()[0];
}

const adminDb = getFirestore(adminApp);

export function FirebaseAdapter() {
  return {
    async createUser(user) {
      const userRef = adminDb.collection("users").doc();
      const userData = {
        ...user,
        id: userRef.id,
        emailVerified: user.emailVerified?.toISOString() ?? null,
      };
      await userRef.set(userData);
      return userData;
    },

    async getUser(id) {
      const userDoc = await adminDb.collection("users").doc(id).get();
      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      return {
        ...userData,
        emailVerified: userData.emailVerified
          ? new Date(userData.emailVerified)
          : null,
      };
    },

    // ... resto de métodos usando adminDb
  };
}
