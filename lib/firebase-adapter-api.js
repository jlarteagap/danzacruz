// lib/firebase-adapter-api.js
// Este adaptador usa API routes en lugar de importar firebase-admin directamente

async function callFirebaseAPI(operation, data) {
  const response = await fetch("/api/auth/firebase-operations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ operation, data }),
  });

  if (!response.ok) {
    throw new Error(`Firebase API error: ${response.statusText}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
}

export function FirebaseAPIAdapter() {
  return {
    async createUser(user) {
      return callFirebaseAPI("createUser", user);
    },

    async getUser(id) {
      return callFirebaseAPI("getUser", { id });
    },

    async getUserByEmail(email) {
      return callFirebaseAPI("getUserByEmail", { email });
    },

    async getUserByAccount({ providerAccountId, provider }) {
      return callFirebaseAPI("getUserByAccount", {
        providerAccountId,
        provider,
      });
    },

    async updateUser(user) {
      return callFirebaseAPI("updateUser", user);
    },

    async deleteUser(userId) {
      return callFirebaseAPI("deleteUser", { userId });
    },

    async linkAccount(account) {
      return callFirebaseAPI("linkAccount", account);
    },

    async unlinkAccount({ providerAccountId, provider }) {
      return callFirebaseAPI("unlinkAccount", { providerAccountId, provider });
    },

    async createSession({ sessionToken, userId, expires }) {
      return callFirebaseAPI("createSession", {
        sessionToken,
        userId,
        expires,
      });
    },

    async getSessionAndUser(sessionToken) {
      return callFirebaseAPI("getSessionAndUser", { sessionToken });
    },

    async updateSession({ sessionToken, expires }) {
      return callFirebaseAPI("updateSession", { sessionToken, expires });
    },

    async deleteSession(sessionToken) {
      return callFirebaseAPI("deleteSession", { sessionToken });
    },

    async createVerificationToken({ identifier, expires, token }) {
      return callFirebaseAPI("createVerificationToken", {
        identifier,
        expires,
        token,
      });
    },

    async useVerificationToken({ identifier, token }) {
      return callFirebaseAPI("useVerificationToken", { identifier, token });
    },
  };
}
