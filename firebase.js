// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const db = getFirestore()

export const saveForm = async (values, collectionDB) => {
  try {
    const docRef = await addDoc(collection(db, collectionDB), {
      id: values.email,
      ...values
    })
    return docRef.id
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
