// lib/firebase-adapter-custom.js
// Adapter personalizado compatible con Firebase Admin v13

export function CustomFirebaseAdapter() {
  let adminDb = null;

  const getDb = async () => {
    if (adminDb) return adminDb;

    const { db } = await import("./firebase-admin");
    adminDb = db;
    return adminDb;
  };

  const convertTimestamp = (timestamp) => {
    if (!timestamp) return null;
    if (timestamp.toDate) return timestamp.toDate();
    if (timestamp.seconds) {
      return new Date(
        timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1000000
      );
    }
    return timestamp;
  };

  return {
    async createUser(user) {
      const db = await getDb();
      const userRef = db.collection("users").doc();

      const userData = {
        ...user,
        id: userRef.id,
        role: user.role || "user",
        createdAt: new Date(),
        emailVerified: user.emailVerified || null,
      };

      await userRef.set(userData);
      console.log("Usuario creado:", userData); // Para debug
      return userData;
    },

    async getUser(id) {
      if (!id) return null;

      const db = await getDb();
      const userDoc = await db.collection("users").doc(id).get();

      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      return {
        ...userData,
        emailVerified: convertTimestamp(userData.emailVerified),
      };
    },

    async getUserByEmail(email) {
      if (!email) return null;

      const db = await getDb();
      const querySnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .limit(1)
        .get();

      if (querySnapshot.empty) return null;

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      return {
        ...userData,
        id: userDoc.id,
        emailVerified: convertTimestamp(userData.emailVerified),
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      if (!providerAccountId || !provider) return null;

      const db = await getDb();
      const querySnapshot = await db
        .collection("accounts")
        .where("provider", "==", provider)
        .where("providerAccountId", "==", providerAccountId)
        .limit(1)
        .get();

      if (querySnapshot.empty) return null;

      const accountDoc = querySnapshot.docs[0];
      const account = accountDoc.data();

      if (!account.userId) return null;

      // Obtener el usuario
      const userDoc = await db.collection("users").doc(account.userId).get();
      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      return {
        ...userData,
        id: userDoc.id,
        emailVerified: convertTimestamp(userData.emailVerified),
      };
    },

    async updateUser(user) {
      if (!user || !user.id) return user;

      const db = await getDb();
      const userRef = db.collection("users").doc(user.id);

      const { id, ...updateData } = user;
      await userRef.update({
        ...updateData,
        updatedAt: new Date(),
      });

      return user;
    },

    async deleteUser(userId) {
      if (!userId) return;

      const db = await getDb();

      // Eliminar usuario
      await db.collection("users").doc(userId).delete();

      // Eliminar cuentas asociadas
      const accountsQuery = await db
        .collection("accounts")
        .where("userId", "==", userId)
        .get();

      const batch = db.batch();
      accountsQuery.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Eliminar sesiones
      const sessionsQuery = await db
        .collection("sessions")
        .where("userId", "==", userId)
        .get();

      sessionsQuery.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    },

    async linkAccount(account) {
      const db = await getDb();
      const accountId = `${account.provider}-${account.providerAccountId}`;
      const accountRef = db.collection("accounts").doc(accountId);

      await accountRef.set(account);
      return account;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const db = await getDb();
      const accountId = `${provider}-${providerAccountId}`;
      await db.collection("accounts").doc(accountId).delete();
    },

    async createSession({ sessionToken, userId, expires }) {
      const db = await getDb();
      const sessionRef = db.collection("sessions").doc(sessionToken);

      const sessionData = {
        sessionToken,
        userId,
        expires: expires,
      };

      await sessionRef.set(sessionData);
      return sessionData;
    },

    async getSessionAndUser(sessionToken) {
      if (!sessionToken) return null;

      const db = await getDb();
      const sessionDoc = await db
        .collection("sessions")
        .doc(sessionToken)
        .get();

      if (!sessionDoc.exists) return null;

      const sessionData = sessionDoc.data();

      // Verificar si la sesión ha expirado
      const expires = convertTimestamp(sessionData.expires);
      if (expires && expires < new Date()) {
        await sessionDoc.ref.delete();
        return null;
      }

      const session = {
        sessionToken: sessionData.sessionToken,
        userId: sessionData.userId,
        expires: expires,
      };

      // Obtener el usuario
      const userDoc = await db.collection("users").doc(session.userId).get();
      if (!userDoc.exists) return null;

      const userData = userDoc.data();
      const user = {
        ...userData,
        id: userDoc.id,
        emailVerified: convertTimestamp(userData.emailVerified),
      };

      return { session, user };
    },

    async updateSession({ sessionToken, expires }) {
      if (!sessionToken) return null;

      const db = await getDb();
      const sessionRef = db.collection("sessions").doc(sessionToken);

      await sessionRef.update({ expires });
      return { sessionToken, expires };
    },

    async deleteSession(sessionToken) {
      if (!sessionToken) return;

      const db = await getDb();
      await db.collection("sessions").doc(sessionToken).delete();
    },

    async createVerificationToken({ identifier, expires, token }) {
      const db = await getDb();
      const tokenRef = db.collection("verification_tokens").doc(token);

      const verificationData = {
        identifier,
        token,
        expires: expires,
      };

      await tokenRef.set(verificationData);
      return verificationData;
    },

    async useVerificationToken({ identifier, token }) {
      if (!identifier || !token) return null;

      const db = await getDb();
      const tokenDoc = await db
        .collection("verification_tokens")
        .doc(token)
        .get();

      if (!tokenDoc.exists) return null;

      const tokenData = tokenDoc.data();

      // Verificar que el identifier coincida
      if (tokenData.identifier !== identifier) return null;

      // Eliminar el token (solo se usa una vez)
      await tokenDoc.ref.delete();

      return {
        identifier: tokenData.identifier,
        token: tokenData.token,
        expires: convertTimestamp(tokenData.expires),
      };
    },
  };
}
