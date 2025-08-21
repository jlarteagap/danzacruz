// lib/firebase-adapter-server.js
// Este adaptador solo funciona en el servidor
export function FirebaseAdminAdapter() {
  return {
    async createUser(user) {
      // Importación dinámica para asegurar que solo se ejecute en servidor
      const { adminDb } = await import("./firebase-admin-config");

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
      const { adminDb } = await import("./firebase-admin-config");

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

    async getUserByEmail(email) {
      const { adminDb } = await import("./firebase-admin-config");

      const usersRef = adminDb.collection("users");
      const querySnapshot = await usersRef.where("email", "==", email).get();

      if (querySnapshot.empty) return null;

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      return {
        ...userData,
        id: userDoc.id,
        emailVerified: userData.emailVerified
          ? new Date(userData.emailVerified)
          : null,
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const { adminDb } = await import("./firebase-admin-config");

      const accountsRef = adminDb.collection("accounts");
      const querySnapshot = await accountsRef
        .where("provider", "==", provider)
        .where("providerAccountId", "==", providerAccountId)
        .get();

      if (querySnapshot.empty) return null;

      const accountDoc = querySnapshot.docs[0];
      const account = accountDoc.data();

      // Obtener el usuario
      const userDoc = await adminDb
        .collection("users")
        .doc(account.userId)
        .get();
      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      return {
        ...userData,
        id: userDoc.id,
        emailVerified: userData.emailVerified
          ? new Date(userData.emailVerified)
          : null,
      };
    },

    async updateUser(user) {
      const { adminDb } = await import("./firebase-admin-config");

      const userRef = adminDb.collection("users").doc(user.id);
      await userRef.update({
        ...user,
        emailVerified: user.emailVerified?.toISOString() ?? null,
      });
      return user;
    },

    async deleteUser(userId) {
      const { adminDb } = await import("./firebase-admin-config");

      await adminDb.collection("users").doc(userId).delete();
    },

    async linkAccount(account) {
      const { adminDb } = await import("./firebase-admin-config");

      const accountRef = adminDb
        .collection("accounts")
        .doc(`${account.provider}-${account.providerAccountId}`);
      await accountRef.set(account);
      return account;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const { adminDb } = await import("./firebase-admin-config");

      const accountRef = adminDb
        .collection("accounts")
        .doc(`${provider}-${providerAccountId}`);
      await accountRef.delete();
    },

    async createSession({ sessionToken, userId, expires }) {
      const { adminDb } = await import("./firebase-admin-config");

      const sessionRef = adminDb.collection("sessions").doc(sessionToken);
      const session = { sessionToken, userId, expires: expires.toISOString() };
      await sessionRef.set(session);
      return session;
    },

    async getSessionAndUser(sessionToken) {
      const { adminDb } = await import("./firebase-admin-config");

      const sessionDoc = await adminDb
        .collection("sessions")
        .doc(sessionToken)
        .get();
      if (!sessionDoc.exists) return null;

      const sessionData = sessionDoc.data();
      const session = {
        ...sessionData,
        expires: new Date(sessionData.expires),
      };

      // Obtener el usuario
      const userDoc = await adminDb
        .collection("users")
        .doc(session.userId)
        .get();
      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      const user = {
        ...userData,
        id: userDoc.id,
        emailVerified: userData.emailVerified
          ? new Date(userData.emailVerified)
          : null,
      };

      return { session, user };
    },

    async updateSession({ sessionToken, expires }) {
      const { adminDb } = await import("./firebase-admin-config");

      const sessionRef = adminDb.collection("sessions").doc(sessionToken);
      const updatedSession = { expires: expires.toISOString() };
      await sessionRef.update(updatedSession);
      return { sessionToken, expires };
    },

    async deleteSession(sessionToken) {
      const { adminDb } = await import("./firebase-admin-config");

      await adminDb.collection("sessions").doc(sessionToken).delete();
    },

    async createVerificationToken({ identifier, expires, token }) {
      const { adminDb } = await import("./firebase-admin-config");

      const tokenRef = adminDb.collection("verification_tokens").doc(token);
      const verificationToken = {
        identifier,
        token,
        expires: expires.toISOString(),
      };
      await tokenRef.set(verificationToken);
      return verificationToken;
    },

    async useVerificationToken({ identifier, token }) {
      const { adminDb } = await import("./firebase-admin-config");

      const tokenDoc = await adminDb
        .collection("verification_tokens")
        .doc(token)
        .get();
      if (!tokenDoc.exists) return null;

      const tokenData = tokenDoc.data();
      await tokenDoc.ref.delete();

      return {
        ...tokenData,
        expires: new Date(tokenData.expires),
      };
    },
  };
}
