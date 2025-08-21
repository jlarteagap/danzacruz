// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDocs,
  getDoc,
  query,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
type Unsubscribe = () => void;
type Subscriber = {
  id: string;
  [key: string]: any; // Ajusta esto según la estructura real de tus datos
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const storage = getStorage(app);
const db = getFirestore(app);

export { app, db };

export const saveForm = async (values, collectionDB) => {
  try {
    const docRef = await addDoc(collection(db, collectionDB), {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: false,
      ...values,
    });

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

type GetServerData = () => Promise<Subscriber[]>;
type GetClientData = (callback: (data: Subscriber[]) => void) => Unsubscribe;

export const getSubscribers = (
  collectionDB: string
): GetServerData | GetClientData => {
  const q = query(collection(db, collectionDB));

  if (typeof window === "undefined") {
    // Versión para el servidor
    const getServerData: GetServerData = async () => {
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };
    return getServerData;
  } else {
    // Versión para el cliente
    const getClientData: GetClientData = (callback) => {
      return onSnapshot(q, (querySnapshot) => {
        const subscribers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(subscribers);
      });
    };
    return getClientData;
  }
};
export const getRegister = async (id, collectionDB) => {
  const docRef = doc(db, collectionDB, id);
  const docSnap = await getDoc(docRef);

  return docSnap;
};

export const deleteRegister = async (id, collectionDB) =>
  deleteDoc(doc(db, collectionDB, id));

export const updateRegister = (id, newfields, collectionDB) =>
  updateDoc(doc(db, collectionDB, id), newfields);

export const uploadFile = async (file, name, section) => {
  const fileName = `${name.replaceAll(" ", "-")}`;

  const storageRef = ref(storage, `${section}/${fileName}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
};
