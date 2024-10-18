// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
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
  onSnapshot
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDISoosVGT6XEvFufHw276_REadKNIJnWc',
  authDomain: 'danzacruz-f6eec.firebaseapp.com',
  projectId: 'danzacruz-f6eec',
  storageBucket: 'danzacruz-f6eec.appspot.com',
  messagingSenderId: '1079471460424',
  appId: '1:1079471460424:web:388d0606f9bcce9c3bc87d'
}
type Unsubscribe = () => void
type Subscriber = {
  id: string
  [key: string]: any // Ajusta esto según la estructura real de tus datos
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore()

export const saveForm = async (values, collectionDB) => {
  try {
    const docRef = await addDoc(collection(db, collectionDB), {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: false,
      ...values
    })

    return docRef.id
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

type GetServerData = () => Promise<Subscriber[]>
type GetClientData = (callback: (data: Subscriber[]) => void) => Unsubscribe

export const getSubscribers = (
  collectionDB: string
): GetServerData | GetClientData => {
  const q = query(collection(db, collectionDB))

  if (typeof window === 'undefined') {
    // Versión para el servidor
    const getServerData: GetServerData = async () => {
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    return getServerData
  } else {
    // Versión para el cliente
    const getClientData: GetClientData = callback => {
      return onSnapshot(q, querySnapshot => {
        const subscribers = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        callback(subscribers)
      })
    }
    return getClientData
  }
}
export const getRegister = async (id, collectionDB) => {
  const docRef = doc(db, collectionDB, id)
  const docSnap = await getDoc(docRef)

  return docSnap
}

export const deleteRegister = async (id, collectionDB) =>
  deleteDoc(doc(db, collectionDB, id))

export const updateRegister = (id, newfields, collectionDB) =>
  updateDoc(doc(db, collectionDB, id), newfields)

export const uploadFile = async (file, name, section) => {
  const fileName = `${name.replaceAll(' ', '-')}`

  const storageRef = ref(storage, `${section}/${fileName}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)

  return url
}
