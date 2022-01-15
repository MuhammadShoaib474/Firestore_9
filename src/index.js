// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, deleteField,
    setDoc,
    getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";



const firebaseConfig = {
  apiKey: "AIzaSyCR6nPtBXBwufOXb8MUMd0FULEjeSU-Wig",
  authDomain: "calculator-d863e.firebaseapp.com",
  projectId: "calculator-d863e",
  storageBucket: "calculator-d863e.appspot.com",
  messagingSenderId: "945573761639",
  appId: "1:945573761639:web:33d7af386864fc8e89fac2",
  measurementId: "G-BRSBCFVQFP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

const colRef = collection(db, "food");
let edit = false



const DivContainer = document.getElementById("container");


const foodsForm = document.getElementById("add");


const  foodColRef= collection(db, "food");

foodsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!edit) {
    addDoc(foodColRef, {
      name: foodsForm.name.value,
      price: foodsForm.price.value,
      image: foodsForm.image.value,
      description: foodsForm.description.value,
    }).then(() => {
      foodsForm.reset();
    });
  }

});



const addfoodItem = (obj) => {
    
  const divSec = document.createElement("divsec");
  divSec.setAttribute("id", "div")
 
  const foodName = document.createElement("h5");
  foodName.append(obj.name);
  foodName.setAttribute("class", "text-dark text-center")
 
  const delBtn = document.createElement("img");
  delBtn.setAttribute("id", obj.id);
  delBtn.setAttribute("src", "deletebtn.png")
  delBtn.setAttribute("class", "delbtn")
 
  const editBtn = document.createElement("img");
  editBtn.setAttribute("id", obj.id);
  editBtn.setAttribute("class", "editbtn");
  editBtn.setAttribute("src", "edit.png");
  
  const foodImage = document.createElement("img");
  foodImage.setAttribute("id", "imgItem")
  foodImage.setAttribute("src", obj.image)
 
  const foodPrice = document.createElement("h6");
  foodPrice.append("$",obj.price);

const foodDescription = document.createElement("h6");
foodDescription.append(obj.description)
  divSec.append(foodName);
  divSec.append(delBtn);
  divSec.append(foodImage);
  divSec.append(foodPrice)
  divSec.append(foodDescription)
  divSec.append(editBtn)
  divSec.append(editBtn);
  DivContainer.appendChild(divSec)
        

  delBtn.addEventListener("click", (e) => deleteDocument(e.target.id));

  editBtn.addEventListener("click", (e) => editDocument(e.target.id));
};

const unsubscribe = onSnapshot(
  foodColRef,
  (snapshot) => {
    let foods = [];
    snapshot.forEach((doc) => {
      foods.push({ id: doc.id, ...doc.data() });
    });
    console.log('fooditems==>', foods)
    showThefoods(foods);
  },
  (error) => {
    console.log("No such document!");
  }
);
 
const showThefoods = (arr) => {
  DivContainer.innerHTML = null;
  arr.map((data) => addfoodItem(data));
};

const deleteDocument = async (id) => {
  const deleted = await deleteDoc(doc(db, "food", id));
  
};


const editDocument = async (id) => {
 
  edit = true
  if (edit) {
    let docRef = doc(db, 'food',id)
    let foodObj = await getDoc(docRef)
    foodObj = foodObj.data()
    foodsForm.name.value = foodObj.name
    foodsForm.image.value = foodObj.image
    foodsForm.price.value = foodObj.price
    foodsForm.description.value = foodObj.description
    

    const btn = foodsForm.getElementsByTagName('button')
    console.log(btn)
    btn[0].innerText = 'Update food item'
    btn[0].addEventListener('click', () => {
    
      setDoc(docRef, {
        name: foodsForm.name.value,
        image: foodsForm.image.value,
        price: foodsForm.price.value,
        description: foodsForm.description.value,
      }).then((e) => {
        foodsForm.reset();
      });
    
    
   
    
     btn[0].innerText = 'submit'
     edit = false
   })
  }

}
btn[0].innerText ="submit"