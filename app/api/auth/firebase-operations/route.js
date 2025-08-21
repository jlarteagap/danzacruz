// pages/api/auth/firebase-operations.js
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializar Firebase Admin solo en esta API route
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { operation, data } = req.body;

  try {
    let result;

    switch (operation) {
      case "createUser":
        const userRef = adminDb.collection("users").doc();
        const userData = {
          ...data,
          id: userRef.id,
          emailVerified: data.emailVerified?.toISOString() ?? null,
        };
        await userRef.set(userData);
        result = userData;
        break;

      case "getUser":
        const userDoc = await adminDb.collection("users").doc(data.id).get();
        if (!userDoc.exists) {
          result = null;
        } else {
          const userData = userDoc.data();
          result = {
            ...userData,
            emailVerified: userData.emailVerified
              ? new Date(userData.emailVerified)
              : null,
          };
        }
        break;

      case "getUserByEmail":
        const usersRef = adminDb.collection("users");
        const querySnapshot = await usersRef
          .where("email", "==", data.email)
          .get();
        if (querySnapshot.empty) {
          result = null;
        } else {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          result = {
            ...userData,
            id: userDoc.id,
            emailVerified: userData.emailVerified
              ? new Date(userData.emailVerified)
              : null,
          };
        }
        break;

      case "createSession":
        const sessionRef = adminDb
          .collection("sessions")
          .doc(data.sessionToken);
        const session = {
          sessionToken: data.sessionToken,
          userId: data.userId,
          expires: data.expires.toISOString(),
        };
        await sessionRef.set(session);
        result = session;
        break;

      case "getSessionAndUser":
        const sessionDoc = await adminDb
          .collection("sessions")
          .doc(data.sessionToken)
          .get();
        if (!sessionDoc.exists) {
          result = null;
        } else {
          const sessionData = sessionDoc.data();
          const session = {
            ...sessionData,
            expires: new Date(sessionData.expires),
          };

          const userDoc = await adminDb
            .collection("users")
            .doc(session.userId)
            .get();
          if (!userDoc.exists) {
            result = null;
          } else {
            const userData = userDoc.data();
            const user = {
              ...userData,
              id: userDoc.id,
              emailVerified: userData.emailVerified
                ? new Date(userData.emailVerified)
                : null,
            };
            result = { session, user };
          }
        }
        break;

      case "linkAccount":
        const accountRef = adminDb
          .collection("accounts")
          .doc(`${data.provider}-${data.providerAccountId}`);
        await accountRef.set(data);
        result = data;
        break;

      default:
        return res.status(400).json({ error: "Invalid operation" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Firebase operation error:", error);
    res.status(500).json({ error: error.message });
  }
}
