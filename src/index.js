// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,collection,addDoc} from "firebase/firestore";
import { async } from "@firebase/util";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR6nPtBXBwufOXb8MUMd0FULEjeSU-Wig",
  authDomain: "calculator-d863e.firebaseapp.com",
  projectId: "calculator-d863e",
  storageBucket: "calculator-d863e.appspot.com",
  messagingSenderId: "945573761639",
  appId: "1:945573761639:web:33d7af386864fc8e89fac2",
  measurementId: "G-BRSBCFVQFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore()
const foodcollectionrefrence = collection(db, 'food')

const form = document.getElementById('food_form')

console.log(form)

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let obj = {
        name : form.name.value,
        price: form.price.value,
        desc: form.desc.value,
        image:form.image.value,
    }
    console.log(obj)
    const uploadfoodobj = await addDoc(foodcollectionrefrence, obj)
    console.log(uploadfoodobj)
    form.name.value = ''
    form.price.value = ''
    form.desc.value = ''
    form.image.value = ''
})