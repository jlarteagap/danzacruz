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
// export const getSubscribers = collectionDB => {
//   const data = query(collection(db, collectionDB))
//   const subscribers = getDocs(data)

//   return subscribers
// }
export const getSubscribers = collectionDB => {
  const q = query(collection(db, collectionDB))

  // Versión para el servidor
  const getServerData = async () => {
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  // Versión para el cliente
  const getClientData = callback => {
    return onSnapshot(q, querySnapshot => {
      const subscribers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      callback(subscribers)
    })
  }

  // Detectar si estamos en el servidor o en el cliente
  if (typeof window === 'undefined') {
    return getServerData
  } else {
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
