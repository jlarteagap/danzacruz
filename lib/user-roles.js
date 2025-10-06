import { db } from "./firebase-admin";

export async function updateUserRole(userId, role) {
  try {
    await db.collection("users").doc(userId).update({
      role: role,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserRole(userId) {
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data()?.role || "user";
    }
    return "user";
  } catch (error) {
    console.error("Error getting user role:", error);
    return "user";
  }
}

export const ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
};

export function hasRole(userRole, requiredRole) {
  const hierarchy = {
    admin: 3,
    moderator: 2,
    user: 1,
  };

  return hierarchy[userRole] >= hierarchy[requiredRole];
}
