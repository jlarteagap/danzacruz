// lib/firebase-adapter-dynamic.js
// Adaptador Firebase corregido para AuthJS

export function FirebaseDynamicAdapter() {
  // Variable para reutilizar la app admin
  let adminApp = null;
  let adminDb = null;

  const initializeAdmin = async () => {
    if (adminDb) return adminDb;

    const { getFirestore } = await import("firebase-admin/firestore");
    const { initializeApp, cert, getApps } = await import("firebase-admin/app");

    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n"
          ),
        }),
      });
    } else {
      adminApp = getApps()[0];
    }

    adminDb = getFirestore(adminApp);
    return adminDb;
  };

  const convertDateToTimestamp = async (date) => {
    if (!date) return null;
    const { Timestamp } = await import("firebase-admin/firestore");
    return date instanceof Date ? Timestamp.fromDate(date) : date;
  };

  const convertTimestampToDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return timestamp;
    return timestamp.toDate();
  };

  return {
    async createUser(user) {
      const db = await initializeAdmin();
      const userRef = db.collection("users").doc();

      const userData = {
        ...user,
        id: userRef.id,
        emailVerified: await convertDateToTimestamp(user.emailVerified),
      };

      await userRef.set(userData);

      return {
        ...userData,
        emailVerified: user.emailVerified, // Devolver Date original
      };
    },

    async getUser(id) {
      const db = await initializeAdmin();
      const userDoc = await db.collection("users").doc(id).get();

      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      return {
        ...userData,
        emailVerified: convertTimestampToDate(userData.emailVerified),
      };
    },

    async getUserByEmail(email) {
      const db = await initializeAdmin();
      const usersRef = db.collection("users");
      const querySnapshot = await usersRef.where("email", "==", email).get();

      if (querySnapshot.empty) return null;

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      return {
        ...userData,
        id: userDoc.id,
        emailVerified: convertTimestampToDate(userData.emailVerified),
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const db = await initializeAdmin();
      const accountsRef = db.collection("accounts");
      const querySnapshot = await accountsRef
        .where("provider", "==", provider)
        .where("providerAccountId", "==", providerAccountId)
        .get();

      if (querySnapshot.empty) return null;

      const accountDoc = querySnapshot.docs[0];
      const account = accountDoc.data();

      // Obtener el usuario
      const userDoc = await db.collection("users").doc(account.userId).get();
      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      return {
        ...userData,
        id: userDoc.id,
        emailVerified: convertTimestampToDate(userData.emailVerified),
      };
    },

    async updateUser(user) {
      const db = await initializeAdmin();
      const userRef = db.collection("users").doc(user.id);

      const updateData = {
        ...user,
        emailVerified: await convertDateToTimestamp(user.emailVerified),
      };

      await userRef.update(updateData);
      return user;
    },

    async deleteUser(userId) {
      const db = await initializeAdmin();
      await db.collection("users").doc(userId).delete();
    },

    async linkAccount(account) {
      const db = await initializeAdmin();
      const accountRef = db
        .collection("accounts")
        .doc(`${account.provider}-${account.providerAccountId}`);
      await accountRef.set(account);
      return account;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const db = await initializeAdmin();
      const accountRef = db
        .collection("accounts")
        .doc(`${provider}-${providerAccountId}`);
      await accountRef.delete();
    },

    async createSession({ sessionToken, userId, expires }) {
      const db = await initializeAdmin();
      const sessionRef = db.collection("sessions").doc(sessionToken);

      const sessionData = {
        sessionToken,
        userId,
        expires: await convertDateToTimestamp(expires),
      };

      await sessionRef.set(sessionData);
      return { sessionToken, userId, expires };
    },

    async getSessionAndUser(sessionToken) {
      const db = await initializeAdmin();
      const sessionDoc = await db
        .collection("sessions")
        .doc(sessionToken)
        .get();

      if (!sessionDoc.exists) return null;

      const sessionData = sessionDoc.data();
      const session = {
        sessionToken: sessionData.sessionToken,
        userId: sessionData.userId,
        expires: convertTimestampToDate(sessionData.expires),
      };

      // Obtener el usuario
      const userDoc = await db.collection("users").doc(session.userId).get();
      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      const user = {
        ...userData,
        id: userDoc.id,
        emailVerified: convertTimestampToDate(userData.emailVerified),
      };

      return { session, user };
    },

    async updateSession({ sessionToken, expires }) {
      const db = await initializeAdmin();
      const sessionRef = db.collection("sessions").doc(sessionToken);

      const updatedSession = {
        expires: await convertDateToTimestamp(expires),
      };

      await sessionRef.update(updatedSession);
      return { sessionToken, expires };
    },

    async deleteSession(sessionToken) {
      const db = await initializeAdmin();
      await db.collection("sessions").doc(sessionToken).delete();
    },

    async createVerificationToken({ identifier, expires, token }) {
      const db = await initializeAdmin();
      const tokenRef = db.collection("verification_tokens").doc(token);

      const verificationToken = {
        identifier,
        token,
        expires: await convertDateToTimestamp(expires),
      };

      await tokenRef.set(verificationToken);
      return { identifier, token, expires };
    },

    async useVerificationToken({ identifier, token }) {
      const db = await initializeAdmin();
      const tokenDoc = await db
        .collection("verification_tokens")
        .doc(token)
        .get();

      if (!tokenDoc.exists) return null;

      const tokenData = tokenDoc.data();
      await tokenDoc.ref.delete();

      return {
        identifier: tokenData.identifier,
        token: tokenData.token,
        expires: convertTimestampToDate(tokenData.expires),
      };
    },
  };
}
