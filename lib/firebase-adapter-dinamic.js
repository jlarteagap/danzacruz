// lib/firebase-adapter-simple.js
// Adaptador que usa tu instancia de firebase-admin ya configurada

import { db } from "./firebase-admin";

export function FirebaseAdapterSimple() {
  const convertTimestampToDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return timestamp;
    return timestamp.toDate();
  };

  const convertDateToTimestamp = (date) => {
    if (!date) return null;
    if (date instanceof Date) {
      return db._delegate._settings.timestampsInSnapshots !== false
        ? db._delegate._converter.toFirestore({ date }).date
        : date;
    }
    return date;
  };

  return {
    async createUser(user) {
      const userRef = db.collection("users").doc();

      const userData = {
        ...user,
        id: userRef.id,
        role: user.role || "user", // Agregar rol por defecto
        emailVerified: user.emailVerified || null,
        createdAt: new Date(),
      };

      await userRef.set(userData);
      return userData;
    },

    async getUser(id) {
      const userDoc = await db.collection("users").doc(id).get();

      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      return {
        ...userData,
        emailVerified: convertTimestampToDate(userData.emailVerified),
      };
    },

    async getUserByEmail(email) {
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
      const accountsRef = db.collection("accounts");
      const querySnapshot = await accountsRef
        .where("provider", "==", provider)
        .where("providerAccountId", "==", providerAccountId)
        .get();

      if (querySnapshot.empty) return null;

      const accountDoc = querySnapshot.docs[0];
      const account = accountDoc.data();

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
      const userRef = db.collection("users").doc(user.id);
      const updateData = {
        ...user,
        updatedAt: new Date(),
      };

      await userRef.update(updateData);
      return user;
    },

    async deleteUser(userId) {
      await db.collection("users").doc(userId).delete();

      // Limpiar cuentas asociadas
      const accountsQuery = await db
        .collection("accounts")
        .where("userId", "==", userId)
        .get();

      const batch = db.batch();
      accountsQuery.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
    },

    async linkAccount(account) {
      const accountRef = db
        .collection("accounts")
        .doc(`${account.provider}-${account.providerAccountId}`);
      await accountRef.set(account);
      return account;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const accountRef = db
        .collection("accounts")
        .doc(`${provider}-${providerAccountId}`);
      await accountRef.delete();
    },

    async createSession({ sessionToken, userId, expires }) {
      const sessionRef = db.collection("sessions").doc(sessionToken);

      const sessionData = {
        sessionToken,
        userId,
        expires: expires, // Firestore maneja las fechas automáticamente
      };

      await sessionRef.set(sessionData);
      return { sessionToken, userId, expires };
    },

    async getSessionAndUser(sessionToken) {
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
      const sessionRef = db.collection("sessions").doc(sessionToken);
      await sessionRef.update({ expires });
      return { sessionToken, expires };
    },

    async deleteSession(sessionToken) {
      await db.collection("sessions").doc(sessionToken).delete();
    },

    async createVerificationToken({ identifier, expires, token }) {
      const tokenRef = db.collection("verification_tokens").doc(token);

      const verificationToken = {
        identifier,
        token,
        expires,
      };

      await tokenRef.set(verificationToken);
      return { identifier, token, expires };
    },

    async useVerificationToken({ identifier, token }) {
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
