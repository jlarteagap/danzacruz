// lib/firebase-admin-config.js
// Este archivo SOLO se ejecuta en el servidor
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminApp;

if (typeof window === "undefined") {
  // Solo en servidor
  if (!getApps().length) {
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g, "\\n"),
      }),
    });
  } else {
    adminApp = getApps()[0];
  }
}

export const adminDb = adminApp ? getFirestore(adminApp) : null;
